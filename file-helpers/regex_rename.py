#  Bulk rename files from 23_03_2012.txt to 2012-03-23.md (Desired name for Obsidian)
# change path with the desired directory path

import os
import re

home_path = os.path.expanduser('~')
path = home_path + '/Desktop/diary-entries/to-rename'

pattern_to_capture = r'(\d{2})_(\d{2})_(\d{4}).*$'
replace_with = r"\3-\2-\1.md"

comp = re.compile(pattern_to_capture)
for f in os.listdir(path):
    full_path = os.path.join(path, f)
    if os.path.isfile(full_path):

        match = comp.search(f)
        if not match:
            continue

        try:
            new_name = match.expand(replace_with)
            new_name = os.path.join(path, new_name)
        except re.error:
            continue

        if os.path.isfile(new_name):
            print('%s -> %s skipped' % (f, new_name))
        else:
            os.rename(full_path, new_name)
