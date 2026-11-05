"""Resolve local reference files without downloading or implying inspection."""
import argparse
import hashlib
import json
from pathlib import Path
import sys


def inspect(catalog, root):
    results = []
    for row in catalog['references']:
        media = row['media']
        path = root / media['local_filename']
        item = {'reference_id': row['id'], 'filename': media['local_filename'], 'status': 'missing'}
        if path.is_file():
            h = hashlib.sha256()
            with path.open('rb') as f:
                for block in iter(lambda: f.read(1024 * 1024), b''): h.update(block)
            item['sha256'] = h.hexdigest()
            item['status'] = 'identity_match' if item['sha256'] == media.get('sha256') else 'different_bytes_verify_content'
        results.append(item)
    return results


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--catalog', type=Path, default=Path(__file__).resolve().parents[1]/'references/reference-catalog.json')
    ap.add_argument('--root', type=Path, required=True)
    args = ap.parse_args()
    try:
        with args.catalog.open(encoding='utf-8') as f: catalog = json.load(f)
        results = inspect(catalog, args.root)
    except (OSError, ValueError, KeyError) as e:
        print(json.dumps({'error': str(e)})); return 1
    print(json.dumps({'results': results, 'scope': 'file identity only; no playback or artistic inspection performed'}, indent=2))
    return 0 if all(r['status'] == 'identity_match' for r in results) else 1

if __name__ == '__main__': sys.exit(main())
