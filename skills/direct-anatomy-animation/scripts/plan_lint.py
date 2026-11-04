"""Audit declared layer/contact structure. Does not inspect rendered pixels or prove collision safety."""
import json,sys
def audit(plan):
    errors=[];warnings=[];assets=plan.get('assets',[]);ids=[a.get('id') for a in assets];by={a.get('id'):a for a in assets}
    if not ids or None in ids or len(ids)!=len(set(ids)):errors.append('Asset IDs must be unique and nonempty')
    allowed={'fixed','rigid','pose','deform','content','mask','face','overlay'}
    for a in assets:
        name=a.get('id','?');motion=a.get('motion')
        if motion not in allowed:errors.append(f'{name}: unknown motion class')
        if a.get('baked_moving_parts'):errors.append(f'{name}: independent moving parts baked into asset: {a["baked_moving_parts"]}')
        if motion in {'rigid','pose','deform','face'} and len(a.get('pivot',[]))!=2:errors.append(f'{name}: declare a stable pivot/anchor')
        if motion=='pose' and len(a.get('poses',[]))<2:errors.append(f'{name}: needs registered replacement states')
        if a.get('parent') and a['parent'] not in by:errors.append(f'{name}: missing parent')
        if a.get('mask'):
            if a['mask'] not in by or by[a['mask']].get('motion')!='mask':errors.append(f'{name}: missing mask asset')
            if not a.get('containment'):errors.append(f'{name}: masking alone does not constrain motion')
        if a.get('reveals_background') and a.get('backplate') not in by:errors.append(f'{name}: missing revealed background plate')
        if not a.get('source'):warnings.append(f'{name}: source artwork not provided')
        seen={name};node=a
        while node.get('parent') in by:
            parent=node['parent']
            if parent in seen:errors.append(f'{name}: parent cycle');break
            seen.add(parent);node=by[parent]
    for s in plan.get('scenes',[]):
        if not s.get('beats'):errors.append(f'{s.get("id")}: missing action beats')
        for b in s.get('beats',[]):
            if not b.get('action') or not b.get('state_after'):errors.append('Beat needs action and visible resulting state')
            if not isinstance(b.get('start'),(int,float)) or not isinstance(b.get('end'),(int,float)) or b['end']<=b['start']:errors.append('Beat interval invalid')
            for i in b.get('moving',[]):
                if i not in by:errors.append(f'Unknown moving asset {i}')
                elif by[i].get('motion')=='fixed':errors.append(f'{i}: beat moves an asset declared fixed')
            for c in b.get('contacts',[]):
                if c.get('a') not in by or c.get('b') not in by:errors.append('Contact references missing asset')
                if c.get('mode') not in {'grip','touch','occlude','separate','release'}:errors.append('Contact mode must declare intended relation')
                if c.get('mode') in {'grip','touch'} and not c.get('anchors'):errors.append('Contact needs anchors')
    lesson=plan.get('lesson',{})
    if lesson.get('mode')!='direct_to_viewer':warnings.append('Default brand ending is direct-to-viewer; document any user override')
    if not lesson.get('sources'):warnings.append('Medical lesson is not source-verified')
    ready=plan.get('readiness',{})
    if ready.get('status')=='ready':
        if not ready.get('proof_evidence'):errors.append('Ready status requires actual proof evidence')
        if ready.get('missing'):errors.append('Ready status conflicts with unresolved missing items')
        if any(not a.get('source') for a in assets):errors.append('Ready status requires declared source artwork for every asset')
        if plan.get('scope','reel')!='technical_proof' and not lesson.get('sources'):errors.append('Ready reel requires source-verified lesson')
    if ready.get('status')!='ready':warnings.append('Production readiness not claimed; resolve proofs and actual assets before rendering')
    if not plan.get('previews'):warnings.append('No actual milestone preview plan')
    return errors,warnings
if __name__=='__main__':
    if len(sys.argv)!=2:raise SystemExit('Usage: python plan_lint.py scene-plan.json')
    errors,warnings=audit(json.load(open(sys.argv[1])))
    print(json.dumps({'structural_check':'FAIL' if errors else 'PASS','errors':errors,'warnings':warnings,'scope':'Declared structure only; not geometric, medical or visual validation'},indent=2))
    raise SystemExit(1 if errors else 0)
