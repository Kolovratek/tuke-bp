import pandas as pd

def parse_file_to_DataFrame(file):
    if file.name.split(".")[-1] in ['csv', 'json', 'xlsx', 'arff']:
        if file.name.split(".")[-1] == 'csv':
            df = pd.read_csv(file)
        elif file.name.split(".")[-1] == 'json':
            df = pd.read_json(file)
        elif file.name.split(".")[-1] == 'xlsx':
            df = pd.read_excel(file)
        # elif file.name.split(".")[-1] == 'arff':
            # from scikit-learn.datasets import arff
            #df = pd.DataFrame(arff.loadarff(file))
    return df
