import pandas as pd

def parse_file_to_DataFrame(file):
    if file.name.split(".")[-1] in ['csv', 'json', 'xlsx']:
        if file.name.split(".")[-1] == 'csv':
            df = pd.read_csv(file, keep_default_na=False, na_values=[''])
        elif file.name.split(".")[-1] == 'json':
            df = pd.read_json(file)
        elif file.name.split(".")[-1] == 'xlsx':
            df = pd.read_excel(file, keep_default_na=False, na_values=[''])
    return df