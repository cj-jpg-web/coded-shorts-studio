"""Validate production blueprint structure; never claim artistic approval."""
import argparse
import json
import math
import sys


def filled(v):
    return isinstance(v, str) and bool(v.strip())


def number(v):
    if not isinstance(v, (int, float)) or isinstance(v, bool): return False
    try: return math.isfinite(v)
    except OverflowError: return False


def validate(p):
    errors, warnings = [], []
    def need(obj, keys, where):
        if not isinstance(obj, dict):
            errors.append(f'{where}: expected object')
            return False
        for k in keys:
            if k not in obj or obj[k] is None or obj[k] == '':
                errors.append(f'{where}: missing {k}')
        # Scalar prose fields carry decisions; false, whitespace, and containers
        # must not count as completed planning.
        prose = {'reference_id', 'source', 'coverage', 'method', 'anticipation', 'execution', 'contact', 'follow_through', 'reaction', 'recovery', 'subject', 'framing', 'path', 'target', 'type', 'correspondence', 'actor', 'effector', 'space', 'owner', 'anchor', 'phases', 'objective', 'start_state', 'end_state', 'transition_reason', 'gaze', 'body', 'limbs'}
        for k in set(keys) & prose:
            if not filled(obj.get(k)): errors.append(f'{where}.{k}: expected nonempty string')
        return True
    if not isinstance(p, dict):
        return ['plan: expected object'], []
    need(p, ['schema_version', 'stage', 'brief', 'art_contract', 'reference_studies', 'beats', 'risks'], 'plan')
    if type(p.get('schema_version')) is not int or p.get('schema_version') != 2:
        errors.append('schema_version: use 2; migrate legacy fields rather than silently accepting an old plan')
    if p.get('stage') not in ['planning', 'storyboard', 'artwork', 'motion_test', 'production', 'final']:
        errors.append('stage: invalid stage')
    brief = p.get('brief', {})
    if need(brief, ['story', 'factual', 'scope', 'language', 'screen_text', 'timing_status'], 'brief'):
        for key in ['story', 'scope', 'language', 'screen_text']:
            if not filled(brief.get(key)): errors.append(f'brief.{key}: expected nonempty string')
        if not isinstance(brief.get('factual'), bool): errors.append('brief.factual: expected boolean')
        if brief.get('timing_status') not in ['provisional', 'recorded']:
            errors.append('brief.timing_status: expected provisional or recorded')
        if p.get('stage') == 'final' and brief.get('timing_status') != 'recorded':
            errors.append('final: narration timings remain provisional')
    need(p.get('art_contract'), ['characters', 'outlines', 'environments', 'lighting', 'identity_checks'], 'art_contract')
    art = p.get('art_contract')
    if isinstance(art, dict):
        for key in ['characters', 'outlines', 'environments', 'lighting']:
            if not filled(art.get(key)): errors.append(f'art_contract.{key}: expected nonempty string')
        if not isinstance(art.get('identity_checks'), list) or not art['identity_checks'] or not all(filled(x) for x in art['identity_checks']):
            errors.append('art_contract.identity_checks: expected nonempty string array')
    for key in ['risks', 'claim_sources']:
        if key in p and not isinstance(p[key], list): errors.append(f'{key}: expected array')
    studies = p.get('reference_studies')
    if not isinstance(studies, list): errors.append('reference_studies: expected array')
    elif not studies: warnings.append('reference_studies: no footage inspected; reference-dependent gates remain pending')
    else:
        for i, study in enumerate(studies):
            need(study, ['reference_id', 'source', 'coverage', 'method', 'observations', 'limitations'], f'reference_studies[{i}]')
    if isinstance(brief, dict) and brief.get('factual') and not p.get('claim_sources'):
        errors.append('claim_sources: factual story requires supported consequential claims')
    beats = p.get('beats')
    if not isinstance(beats, list) or not beats:
        errors.append('beats: expected nonempty array')
        return errors, warnings
    ids, emotions = set(), {}
    prev_end, prev_staging = None, None
    for i, b in enumerate(beats):
        w = f'beats[{i}]'
        if not need(b, ['id', 'start', 'end', 'narration', 'viewer_question', 'visual_claim', 'representation', 'information_change', 'setting', 'action', 'contacts', 'camera', 'transition', 'cue_words', 'effects', 'actors', 'artwork', 'implementation', 'risks'], w): continue
        bid = b.get('id')
        if not filled(bid): errors.append(f'{w}.id: expected nonempty string')
        elif bid in ids: errors.append(f'{w}.id: duplicate {bid}')
        else: ids.add(bid)
        start, end = b.get('start'), b.get('end')
        valid_times = number(start) and number(end) and start >= 0 and end > start
        if not valid_times: errors.append(f'{w}: start/end must be finite, nonnegative, increasing seconds')
        else:
            if prev_end is not None and start < prev_end - 1e-6: errors.append(f'{w}: beat overlaps preceding beat')
            if prev_end is not None and start > prev_end + .05: warnings.append(f'{w}: unexplained timeline gap')
            prev_end = end
        for k in ['narration', 'viewer_question', 'visual_claim', 'representation', 'information_change', 'setting']:
            if not filled(b.get(k)): errors.append(f'{w}.{k}: expected nonempty string')
        need(b.get('action'), ['anticipation', 'execution', 'contact', 'follow_through', 'reaction', 'recovery'], f'{w}.action')
        camera = b.get('camera', {})
        need(camera, ['subject', 'framing', 'path', 'target', 'hazards'], f'{w}.camera')
        need(b.get('transition'), ['type', 'correspondence', 'continuity_checks'], f'{w}.transition')
        need(b.get('implementation'), ['method', 'status', 'dependencies', 'test'], f'{w}.implementation')
        implementation = b.get('implementation')
        if isinstance(implementation, dict):
            if implementation.get('status') not in ['proposed', 'mechanically_tested', 'artistically_tested', 'integrated_final_verified']:
                errors.append(f'{w}.implementation.status: invalid status')
            for key in ['method', 'test']:
                if not filled(implementation.get(key)): errors.append(f'{w}.implementation.{key}: expected nonempty string')
            if not isinstance(implementation.get('dependencies'), list): errors.append(f'{w}.implementation.dependencies: expected array')
        for k in ['contacts', 'cue_words', 'effects', 'actors', 'artwork', 'risks']:
            if not isinstance(b.get(k), list): errors.append(f'{w}.{k}: expected array')
        for key in ['cue_words', 'effects', 'artwork', 'risks']:
            if isinstance(b.get(key), list) and not all(filled(x) for x in b[key]): errors.append(f'{w}.{key}: expected string entries')
        if not b.get('cue_words'): errors.append(f'{w}.cue_words: identify decisive narration cues')
        if not b.get('artwork'): errors.append(f'{w}.artwork: specify shot-specific artwork')
        for j, contact in enumerate(b.get('contacts', []) if isinstance(b.get('contacts'), list) else []):
            need(contact, ['actor', 'effector', 'target', 'space', 'owner', 'anchor', 'phases'], f'{w}.contacts[{j}]')
        for j, actor in enumerate(b.get('actors', []) if isinstance(b.get('actors'), list) else []):
            aw = f'{w}.actors[{j}]'
            if not need(actor, ['id', 'objective', 'start_state', 'end_state', 'transition_reason', 'gaze', 'body', 'limbs', 'emotion_keys'], aw): continue
            aid = actor.get('id')
            if not filled(aid): errors.append(f'{aw}.id: expected nonempty string'); continue
            if aid in emotions and actor.get('start_state') != emotions[aid] and not actor.get('continuity_reason'):
                warnings.append(f'{aw}: state differs from prior ending; supply continuity_reason or repair emotional continuity')
            if actor.get('end_state') == 'neutral' and actor.get('start_state') != 'neutral' and not filled(actor.get('transition_reason')):
                errors.append(f'{aw}: unexplained neutral reset')
            emotions[aid] = actor.get('end_state')
            keys = actor.get('emotion_keys')
            if not isinstance(keys, list) or not keys: errors.append(f'{aw}.emotion_keys: require temporal performance, not a single expression label')
            else:
                prior = -1
                for k, key in enumerate(keys):
                    if not need(key, ['at', 'state', 'intensity'], f'{aw}.emotion_keys[{k}]'): continue
                    if not filled(key.get('state')): errors.append(f'{aw}.emotion_keys[{k}].state: expected nonempty string')
                    at, strength = key.get('at'), key.get('intensity')
                    if not number(at) or at < prior or (valid_times and not start <= at <= end): errors.append(f'{aw}.emotion_keys[{k}]: invalid time/order')
                    else: prior = at
                    if not number(strength) or not 0 <= strength <= 1: errors.append(f'{aw}.emotion_keys[{k}]: intensity must be 0..1')
        staging = (b.get('setting'), camera.get('framing') if isinstance(camera, dict) else None, b.get('representation'))
        if staging == prev_staging and not b.get('staging_reason'):
            warnings.append(f'{w}: repeated presentation; justify how action/new information changes it')
        prev_staging = staging
    return errors, warnings


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('plan')
    ap.add_argument('--json', action='store_true')
    args = ap.parse_args()
    try:
        with open(args.plan, encoding='utf-8') as f: p = json.load(f)
        errors, warnings = validate(p)
    except (OSError, ValueError) as e:
        errors, warnings = [str(e)], []
    result = {'errors': errors, 'warnings': warnings, 'scope': 'structural validation only; visual and factual review still required'}
    if args.json: print(json.dumps(result, indent=2))
    else:
        for message in errors: print('ERROR:', message)
        for message in warnings: print('WARNING:', message)
        print(result['scope'])
    return 1 if errors else 0

if __name__ == '__main__': sys.exit(main())
