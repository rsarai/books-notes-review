DEFAULT_KINDLE_PATH = "/media/sarai/Kindle/documents/My Clippings.txt"
SEPARATOR = "=========="


def example_script_on_how_to_use_api():
    import json
    import requests
    from notes import scripts

    content = scripts.get_highlights(
        kindle_path="kindle/My Clippings (short).txt"
    )

    url = "http://127.0.0.1:8000/api/importer/"
    r = requests.post(url, json=content, auth=('admin@admin.com', '123'))
    print(r.status_code)
    print(r.__dict__)


def get_formated_title(title):
    title = title.replace(u'\ufeff', '')
    return title.rstrip()


def get_highlights(kindle_path=DEFAULT_KINDLE_PATH):
    """
        IMPORTANT: this is not idempotent. Need to fix this before further imports
    """
    content = []
    with open(kindle_path, encoding='utf-8-sig') as f:
        line = f.readline()

        while line:
            title = get_formated_title(line)
            if SEPARATOR in line:
                continue

            if "Seu destaque" in line:
                line = f.readline()
                continue

            if get_formated_title(line) == title:
                inner_content = []
                _tmp_line = line
                while SEPARATOR not in _tmp_line:
                    _tmp_line = f.readline()
                    if "Seu destaque" in _tmp_line:
                        continue

                    if SEPARATOR in _tmp_line:
                        continue

                    inner_content.append(_tmp_line.strip())

            content.append({
                "book": {"name": title},
                "content": " ".join(inner_content),
            })
            line = f.readline()

    print(len(content))
    return content


if __name__ == "__main__":
    get_highlights()
