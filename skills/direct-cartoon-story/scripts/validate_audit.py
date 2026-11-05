"""Check version-bound audit evidence; do not judge rendered quality or prove viewing."""
import argparse
import json
import re
import sys

DOMAINS = {'story', 'direction', 'art', 'performance_contact', 'camera_transitions', 'editorial_audio', 'technical'}
METHODS = {'audiovisual_playback', 'muted_playback', 'slow_motion', 'frame_inspection', 'sampled_frames', 'automated_scan', 'code_inspection', 'source_review'}
MOTION = {'audiovisual_playback', 'muted_playback', 'slow_motion'}
VISUAL = MOTION | {'frame_inspection', 'sampled_frames'}
DOMAIN_METHODS = {'story': METHODS, 'direction': MOTION, 'art': VISUAL,
                  'performance_contact': MOTION, 'camera_transitions': MOTION,
                  'editorial_audio': {'audiovisual_playback'},
                  'technical': {'audiovisual_playback', 'automated_scan', 'frame_inspection'}}


def validate(p):
    errors, warnings = [], []
    def text(v): return isinstance(v, str) and bool(v.strip())
    def need(obj, keys, w):
        if not isinstance(obj, dict): errors.append(f'{w}: expected object'); return False
        for key in keys:
            if key not in obj or obj[key] is None or obj[key] == '': errors.append(f'{w}: missing {key}')
        return True
    def strings(obj, keys, w):
        for key in keys:
            if not text(obj.get(key)): errors.append(f'{w}.{key}: expected nonempty string')
    def current(obj):
        return obj.get('artifact_version') == artifact.get('version') and obj.get('artifact_sha256') == artifact.get('sha256')
    if not isinstance(p, dict): return ['audit: expected object'], []
    need(p, ['schema_version', 'artifact', 'reviews', 'issues', 'acceptance'], 'audit')
    if type(p.get('schema_version')) is not int or p.get('schema_version') != 1: errors.append('schema_version: expected 1')
    artifact = p.get('artifact', {})
    if not need(artifact, ['path', 'version', 'sha256', 'stage'], 'artifact'): artifact = {}
    strings(artifact, ['path', 'version', 'sha256', 'stage'], 'artifact')
    if not isinstance(artifact.get('sha256'), str) or not re.fullmatch(r'[0-9a-fA-F]{64}', artifact['sha256']): errors.append('artifact.sha256: expected exact exported file hash')
    reviews = p.get('reviews')
    if not isinstance(reviews, list): errors.append('reviews: expected array'); reviews = []
    valid_reviews = []
    reference_coverage = set()
    def string_array(value, nonempty=False):
        return isinstance(value, list) and (bool(value) or not nonempty) and all(text(x) for x in value)

    # Later entries supersede the same reviewer's earlier judgment for each domain
    # on the same artifact. Another reviewer's block needs explicit reconciliation.
    latest = {}
    for i, review in enumerate(reviews):
        w = f'reviews[{i}]'
        if not need(review, ['reviewer', 'role', 'independent', 'artifact_version', 'artifact_sha256', 'coverage', 'methods', 'reference_evidence', 'domain_results', 'findings', 'limitations'], w): continue
        before = len(errors)
        strings(review, ['reviewer', 'role', 'artifact_version', 'artifact_sha256', 'coverage'], w)
        if not isinstance(review.get('independent'), bool): errors.append(f'{w}.independent: expected boolean')
        for key in ['reference_evidence', 'findings', 'limitations']:
            if not isinstance(review.get(key), list): errors.append(f'{w}.{key}: expected array')
        if not string_array(review.get('findings')):
            errors.append(f'{w}.findings: expected issue ID string array')
        evidence = review.get('reference_evidence')
        if isinstance(evidence, list):
            for j, record in enumerate(evidence):
                ew = f'{w}.reference_evidence[{j}]'
                if not need(record, ['reference_id', 'source', 'range', 'methods', 'observations', 'domains'], ew): continue
                strings(record, ['reference_id', 'source', 'range'], ew)
                if not string_array(record.get('observations'), True): errors.append(f'{ew}.observations: expected nonempty string array')
                rm = record.get('methods')
                if not isinstance(rm, list) or not rm or any(not isinstance(x, str) or x not in VISUAL for x in rm): errors.append(f'{ew}.methods: expected visual inspection methods')
                rd = record.get('domains')
                if not string_array(rd, True) or any(x not in DOMAINS for x in rd if isinstance(x, str)): errors.append(f'{ew}.domains: expected nonempty domain array')
        methods = review.get('methods')
        if not isinstance(methods, list) or not methods or any(not isinstance(x, str) or x not in METHODS for x in methods):
            errors.append(f'{w}.methods: invalid/missing methods'); methods = []
        domains = review.get('domain_results')
        if not isinstance(domains, dict): errors.append(f'{w}.domain_results: expected object'); domains = {}
        for name, result in domains.items():
            if name not in DOMAINS or result not in ['pass', 'block', 'not_reviewed']:
                errors.append(f'{w}.domain_results: invalid domain/result'); continue
            if result == 'pass' and not DOMAIN_METHODS[name].intersection(methods):
                errors.append(f'{w}: {name} pass requires domain-appropriate artifact inspection')
        if not current(review):
            warnings.append(f'{w}: stale review; cannot approve current artifact'); continue
        if len(errors) != before: continue
        valid_reviews.append(review)
        for name, result in domains.items():
            previous = latest.get((review['reviewer'], name))
            if previous and previous[0] == 'block' and previous[1]['coverage'] == 'entire_final_export' and review['coverage'] != 'entire_final_export' and result != 'block':
                continue
            latest[(review['reviewer'], name)] = (result, review)
    for (_, domain), (result, review) in latest.items():
        if result != 'pass' or review['coverage'] != 'entire_final_export': continue
        for record in review['reference_evidence']:
            if domain in record['domains'] and DOMAIN_METHODS[domain].intersection(record['methods']):
                reference_coverage.add((record['reference_id'], domain))
    issues = p.get('issues')
    if not isinstance(issues, list): errors.append('issues: expected array'); issues = []
    issue_ids, blockers = set(), []
    for i, issue in enumerate(issues):
        w = f'issues[{i}]'
        if not need(issue, ['id', 'artifact_version', 'range', 'domain', 'severity', 'observed_fault', 'evidence', 'likely_cause', 'repair_owner', 'repair', 'verification', 'affected_neighbors', 'status'], w): continue
        strings(issue, ['id', 'artifact_version', 'domain', 'range', 'observed_fault', 'evidence', 'likely_cause', 'repair_owner', 'repair'], w)
        iid = issue.get('id')
        if text(iid):
            if iid in issue_ids: errors.append(f'{w}.id: duplicate')
            issue_ids.add(iid)
        if not isinstance(issue.get('domain'), str) or issue.get('domain') not in DOMAINS: errors.append(f'{w}.domain: invalid')
        if not isinstance(issue.get('affected_neighbors'), list): errors.append(f'{w}.affected_neighbors: expected array')
        if issue.get('severity') not in ['critical', 'major', 'minor', 'preference']: errors.append(f'{w}.severity: invalid')
        if issue.get('status') not in ['open', 'diagnosed', 'repair_in_progress', 'awaiting_verification', 'closed', 'blocked']: errors.append(f'{w}.status: invalid')
        if issue.get('severity') in ['critical', 'major'] and issue.get('status') != 'closed': blockers.append(iid)
        if issue.get('status') == 'closed':
            verification = issue.get('verification')
            if not need(verification, ['artifact_version', 'artifact_sha256', 'reviewer', 'method', 'evidence', 'result'], f'{w}.verification'): continue
            strings(verification, ['reviewer', 'evidence'], f'{w}.verification')
            if not current(verification): errors.append(f'{w}: closure verification is stale')
            method = verification.get('method')
            if not isinstance(method, str) or method not in DOMAIN_METHODS.get(issue.get('domain') if isinstance(issue.get('domain'), str) else '', set()):
                errors.append(f'{w}: closure requires domain-appropriate artifact inspection')
            if not any(r['reviewer'] == verification.get('reviewer') and method in r['methods'] and r['domain_results'].get(issue.get('domain') if isinstance(issue.get('domain'), str) else '') == 'pass' and latest.get((r['reviewer'], issue.get('domain') if isinstance(issue.get('domain'), str) else ''), (None, None)) == ('pass', r) for r in valid_reviews):
                errors.append(f'{w}: closure requires matching current reviewer/domain/method review')
            if verification.get('result') != 'pass': errors.append(f'{w}: closure lacks passing observed evidence')
    for i, review in enumerate(valid_reviews):
        for finding in review['findings']:
            if finding not in issue_ids: errors.append(f'reviews[{i}].findings: unknown issue ID {finding}')
    acceptance = p.get('acceptance', {})
    if need(acceptance, ['decision', 'lead', 'independent_available', 'limitations'], 'acceptance'):
        strings(acceptance, ['lead'], 'acceptance')
        if not isinstance(acceptance.get('independent_available'), bool): errors.append('acceptance.independent_available: expected boolean')
        if not isinstance(acceptance.get('limitations'), list): errors.append('acceptance.limitations: expected array')
        decision = acceptance.get('decision')
        if decision not in ['pending', 'blocked', 'accepted', 'accepted_with_user_exception']: errors.append('acceptance.decision: invalid')
        if decision in ['accepted', 'accepted_with_user_exception']:
            policy = p.get('reference_policy')
            targets = p.get('reference_targets')
            if policy not in ['required', 'not_requested']: errors.append('reference_policy: expected required or not_requested')
            if not isinstance(targets, list): errors.append('reference_targets: expected array'); targets = []
            if policy == 'required' and not targets: errors.append('reference_targets: required references need targets')
            if policy == 'not_requested' and targets: errors.append('reference_targets: not_requested requires empty targets')
            target_ids = set()
            for i, target in enumerate(targets):
                tw = f'reference_targets[{i}]'
                if not need(target, ['id', 'domains'], tw): continue
                tid, td = target.get('id'), target.get('domains')
                if not text(tid): errors.append(f'{tw}.id: expected nonempty string')
                elif tid in target_ids: errors.append(f'{tw}.id: duplicate')
                else: target_ids.add(tid)
                if not string_array(td, True) or any(x not in DOMAINS for x in td if isinstance(x, str)): errors.append(f'{tw}.domains: expected nonempty domain array'); continue
                if text(tid):
                    for domain in td:
                        if (tid, domain) not in reference_coverage: errors.append(f'{tw}: missing inspected reference evidence for {domain}')
            if artifact.get('stage') != 'final': errors.append('acceptance: requires final export stage')
            if artifact.get('sha256') == '0' * 64 or 'REPLACE_' in str(artifact.get('path', '')): errors.append('acceptance: placeholder artifact identity')
            full = [r for r in valid_reviews if r['coverage'] == 'entire_final_export']
            lead = acceptance.get('lead')
            if not any(r['reviewer'] == lead and r['role'] == 'lead' and 'audiovisual_playback' in r['methods'] for r in full):
                errors.append('acceptance: named lead must inspect entire current final audiovisual export')
            passed = {name for (_, name), (result, review) in latest.items() if result == 'pass' and review['coverage'] == 'entire_final_export'}
            missing = DOMAINS - passed
            if missing: errors.append('acceptance: unpassed full-export domains ' + ', '.join(sorted(missing)))
            if any(result == 'block' for result, _ in latest.values()): errors.append('acceptance: current reviewer/domain block needs a superseding review from that reviewer')
            if acceptance.get('independent_available') is True and not any(r['independent'] is True and r['reviewer'] != lead and r['role'] != 'lead' and 'audiovisual_playback' in r['methods'] and any(result == 'pass' and rr is r for (reviewer, _), (result, rr) in latest.items() if reviewer == r['reviewer']) for r in full):
                errors.append('acceptance: distinct independent current final reviewer missing')
            if acceptance.get('independent_available') is False and not text(acceptance.get('independence_limitation')): errors.append('acceptance: disclose unavailable independent review')
            if blockers and decision == 'accepted': errors.append('acceptance: unresolved critical/major issues ' + ', '.join(map(str, blockers)))
            if decision == 'accepted_with_user_exception':
                exception = acceptance.get('user_exception')
                if not need(exception, ['artifact_version', 'artifact_sha256', 'issue_ids', 'evidence'], 'acceptance.user_exception'): exception = {}
                if not current(exception) or not text(exception.get('evidence')): errors.append('acceptance: require artifact-bound explicit user exception evidence')
                ids = exception.get('issue_ids')
                if not isinstance(ids, list) or not ids or any(not text(x) for x in ids): errors.append('acceptance.user_exception.issue_ids: expected nonempty string array')
                elif any(x not in issue_ids for x in ids) or any(x not in ids for x in blockers): errors.append('acceptance: exception must identify every waived blocker and only known issues')
    return errors, warnings


def main():
    ap = argparse.ArgumentParser(description=__doc__); ap.add_argument('audit'); args = ap.parse_args()
    try:
        with open(args.audit, encoding='utf-8') as f: p = json.load(f)
        errors, warnings = validate(p)
    except (OSError, ValueError) as e: errors, warnings = [str(e)], []
    print(json.dumps({'errors': errors, 'warnings': warnings, 'scope': 'evidence structure only; viewing, artistic and factual approval not proven'}, indent=2))
    return 1 if errors else 0

if __name__ == '__main__': sys.exit(main())
