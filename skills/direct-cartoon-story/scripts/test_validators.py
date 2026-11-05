"""Regression tests for structural gates; these cannot establish actual viewing."""
import copy
import json
from pathlib import Path
import unittest
import validate_audit as audit
import validate_plan as plan

ROOT = Path(__file__).resolve().parents[1]
HASH = '1' * 64

def review(reviewer='director', role='lead', independent=False):
    return dict(reviewer=reviewer, role=role, independent=independent,
                artifact_version='v2', artifact_sha256=HASH,
                coverage='entire_final_export', methods=['audiovisual_playback', 'slow_motion'],
                reference_evidence=[], domain_results={d: 'pass' for d in audit.DOMAINS},
                findings=[], limitations=[])

def ledger():
    return dict(schema_version=1, reference_policy='not_requested', reference_targets=[], artifact=dict(path='film.mp4', version='v2', sha256=HASH, stage='final'),
                reviews=[review(), review('critic', 'reviewer', True)], issues=[],
                acceptance=dict(decision='accepted', lead='director', independent_available=True, limitations=[]))

def issue():
    return dict(id='grip', artifact_version='v1', range='0–2s', domain='performance_contact',
                severity='major', observed_fault='Disconnected grip', evidence='Frame 12',
                likely_cause='Anchor hypothesis', repair_owner='animator', repair='Re-anchor',
                verification=dict(artifact_version='v2', artifact_sha256=HASH, reviewer='critic',
                                  method='slow_motion', evidence='Grip holds over frames 10–60', result='pass'),
                affected_neighbors=['next'], status='closed')

class Gates(unittest.TestCase):
    def test_templates(self):
        for name, module in [('production-plan', plan), ('audit-ledger', audit)]:
            value = json.loads((ROOT / 'assets' / f'{name}.template.json').read_text())
            self.assertEqual(module.validate(value)[0], [])

    def test_positive_final(self): self.assertEqual(audit.validate(ledger())[0], [])

    def test_final_coverage(self):
        for change in ['stage', 'lead', 'independence', 'coverage', 'placeholder']:
            p = ledger()
            if change == 'stage': p['artifact']['stage'] = 'planning'
            if change == 'lead': p['acceptance']['lead'] = 'absent'
            if change == 'independence': p['reviews'] = [review(independent=True)]
            if change == 'coverage':
                p['reviews'][0]['domain_results'] = {}
                p['reviews'][1]['coverage'] = 'one_frame'
            if change == 'placeholder': p['artifact']['sha256'] = '0' * 64
            with self.subTest(change=change): self.assertTrue(audit.validate(p)[0])

    def test_stale_pass_does_not_count(self):
        p = ledger(); p['reviews'][1]['artifact_version'] = 'v1'; p['reviews'][0]['domain_results'] = {}
        self.assertTrue(audit.validate(p)[0])

    def test_block_supersession_and_version(self):
        p = ledger(); blocked = review(); blocked['domain_results'] = {'art': 'block'}
        p['reviews'].insert(0, blocked)
        self.assertEqual(audit.validate(p)[0], [])
        p['reviews'].append(blocked)
        self.assertTrue(audit.validate(p)[0])
        blocked['artifact_version'] = 'old'
        self.assertEqual(audit.validate(p)[0], [])

    def test_not_reviewed_invalidates_same_reviewer_pass(self):
        p = ledger(); p['reviews'][1]['domain_results'] = {}
        later = review(); later['domain_results'] = {'art': 'not_reviewed'}; p['reviews'].append(later)
        self.assertTrue(audit.validate(p)[0])

    def test_closed_fault_requires_artifact_method_and_current_identity(self):
        p = ledger(); p['issues'] = [issue()]
        self.assertEqual(audit.validate(p)[0], [])
        for field, value in [('method', 'code_inspection'), ('method', 'invented'), ('artifact_sha256', '2' * 64), ('artifact_version', 'v1')]:
            q = copy.deepcopy(p); q['issues'][0]['verification'][field] = value
            with self.subTest(field=field, value=value): self.assertTrue(audit.validate(q)[0])

    def test_exception_must_cover_specific_blockers(self):
        p = ledger(); p['issues'] = [issue()]; p['issues'][0]['status'] = 'open'
        self.assertTrue(audit.validate(p)[0])
        p['acceptance'].update(decision='accepted_with_user_exception', user_exception_evidence='ok')
        self.assertTrue(audit.validate(p)[0])
        p['acceptance']['user_exception'] = dict(artifact_version='v2', artifact_sha256=HASH, issue_ids=['grip'], evidence='User explicitly accepts remaining grip defect')
        self.assertEqual(audit.validate(p)[0], [])
        p['acceptance']['user_exception']['issue_ids'] = ['other']
        self.assertTrue(audit.validate(p)[0])

    def test_malformed_methods(self):
        p = ledger(); p['reviews'][0]['methods'] = [{}]
        self.assertTrue(audit.validate(p)[0])

    def test_plan_bad_types(self):
        p = json.loads((ROOT / 'assets/production-plan.template.json').read_text())
        for path, value in [(['brief','story'], []), (['art_contract','characters'], False),
                            (['risks'], 'bad'), (['beats',0,'artwork'], [None]),
                            (['beats',0,'implementation','status'], 'magic')]:
            q = copy.deepcopy(p); target = q
            for key in path[:-1]: target = target[key]
            target[path[-1]] = value
            with self.subTest(path=path): self.assertTrue(plan.validate(q)[0])


    def test_reference_requirements(self):
        p = ledger(); p['reference_policy'] = 'required'; p['reference_targets'] = [{'id':'film', 'domains':['art']}]
        self.assertTrue(audit.validate(p)[0])
        record = dict(reference_id='film', source='reference.mp4', range='0–2s', methods=['frame_inspection'], observations=['Thick outlines'], domains=['art'])
        p['reviews'][0]['reference_evidence'] = [record]
        self.assertEqual(audit.validate(p)[0], [])
        for key, value in [('observations', False), ('methods', ['source_review']), ('domains', [None]), ('range', [])]:
            q = copy.deepcopy(p); q['reviews'][0]['reference_evidence'][0][key] = value
            self.assertTrue(audit.validate(q)[0])
        q = ledger(); del q['reference_policy']; self.assertTrue(audit.validate(q)[0])

    def test_reference_evidence_requires_effective_domain_pass(self):
        p = ledger(); p.update(reference_policy='required', reference_targets=[{'id':'film', 'domains':['art']}])
        p['reviews'][0]['reference_evidence'] = [dict(reference_id='film', source='ref.mp4', range='0–2s', methods=['frame_inspection'], observations=['Outline'], domains=['art'])]
        self.assertEqual(audit.validate(p)[0], [])
        later = review(); later['domain_results'] = {'art':'not_reviewed'}; p['reviews'].append(later)
        self.assertTrue(audit.validate(p)[0])
        later['domain_results'] = {'art':'pass'}
        self.assertTrue(audit.validate(p)[0])
        later['reference_evidence'] = copy.deepcopy(p['reviews'][0]['reference_evidence'])
        self.assertEqual(audit.validate(p)[0], [])

    def test_independent_must_inspect_and_pass(self):
        p = ledger(); p['reviews'][1].update(domain_results={'art':'not_reviewed'}, methods=['source_review'])
        self.assertTrue(audit.validate(p)[0])
        p = ledger(); later = review('critic', 'reviewer', True); later['domain_results'] = {d:'not_reviewed' for d in audit.DOMAINS}; p['reviews'].append(later)
        self.assertTrue(audit.validate(p)[0])

    def test_local_pass_cannot_clear_final_block(self):
        p = ledger(); blocked = review('critic', 'reviewer', True); blocked['domain_results'] = {'art':'block'}
        p['reviews'].append(blocked)
        local = copy.deepcopy(blocked); local.update(coverage='one_frame', methods=['frame_inspection'], domain_results={'art':'pass'})
        p['reviews'].append(local); self.assertTrue(audit.validate(p)[0])
        final = copy.deepcopy(local); final['coverage'] = 'entire_final_export'; p['reviews'].append(final)
        self.assertEqual(audit.validate(p)[0], [])

    def test_findings_must_identify_issues(self):
        for value in [[{'severity':'critical'}], ['unknown']]:
            p = ledger(); p['reviews'][0]['findings'] = value
            self.assertTrue(audit.validate(p)[0])
        p = ledger(); p['issues'] = [issue()]; p['reviews'][0]['findings'] = ['grip']
        self.assertEqual(audit.validate(p)[0], [])

    def test_issue_closure_requires_review_and_range(self):
        for field, value in [('reviewer','nonexistent'), ('method','muted_playback')]:
            p = ledger(); p['issues'] = [issue()]; p['issues'][0]['verification'][field] = value
            self.assertTrue(audit.validate(p)[0])
        p = ledger(); p['issues'] = [issue()]; p['issues'][0]['range'] = []
        self.assertTrue(audit.validate(p)[0])

    def test_plan_requires_structured_sources_and_studies(self):
        p = json.loads((ROOT/'assets/production-plan.template.json').read_text()); p['brief']['factual'] = True
        p['claim_sources'] = [False]; self.assertTrue(plan.validate(p)[0])
        p['claim_sources'] = [dict(claim='Date', source='archive', evidence='Page 2')]
        p['reference_studies'] = [dict(reference_id='film', source='film.mp4', coverage='0–2s', method='frame_inspection', observations=['Outlines'], limitations=[])]
        self.assertEqual(plan.validate(p)[0], [])
        for key, value in [('method','invented'), ('observations',False), ('limitations',42)]:
            q = copy.deepcopy(p); q['reference_studies'][0][key] = value
            self.assertTrue(plan.validate(q)[0])

    def test_no_crashes_for_wrong_json_types(self):
        # Replace every individual field in otherwise valid documents with each
        # JSON type. A validator may reject it but must always return diagnostics.
        def paths(value, prefix=()):
            if isinstance(value, dict):
                for key, child in value.items():
                    yield prefix + (key,)
                    yield from paths(child, prefix + (key,))
            elif isinstance(value, list):
                for index, child in enumerate(value):
                    yield prefix + (index,)
                    yield from paths(child, prefix + (index,))
        p = ledger(); p['issues'] = [issue()]
        fixtures = [(audit,p), (plan,json.loads((ROOT/'assets/production-plan.template.json').read_text()))]
        for module, fixture in fixtures:
            for path in paths(fixture):
                for replacement in [None, False, 0, '', ' ', [], {}, [None]]:
                    candidate = copy.deepcopy(fixture); target = candidate
                    for key in path[:-1]: target = target[key]
                    target[path[-1]] = replacement
                    with self.subTest(module=module.__name__, path=path, replacement=replacement):
                        errors, warnings = module.validate(candidate)
                        self.assertIsInstance(errors, list); self.assertIsInstance(warnings, list)

if __name__ == '__main__': unittest.main()
