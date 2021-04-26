import pytz
import requests

from hq.modules.bash import process as bash_commands


ENDPOINT_URL = "http://127.0.0.1:8000/api/nodes/create/"

# this is buggy
for cmd in bash_commands():
    payload = {
        "provider": {"name": "bash"},
        "acitvity": {"name": "commanded"},
        "date": str(cmd.date_tz),
        "timestamp_utc": str(cmd.date_tz.astimezone(pytz.utc).timestamp()),
        "timezone": "America/Recife",
        "command": f"{cmd.folder}  {cmd.cmd}",
        "device_name": cmd.host
    }
    r = requests.post(ENDPOINT_URL, json=payload, auth=('admin@admin.com', '123'))
    print(r.status_code)
    if r.status_code != 201:
        print(r.content)
        print(cmd.cmd)


