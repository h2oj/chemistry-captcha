import pandas as pd
url="https://www.chemicalbook.com/CASDetailList_500.htm"
tables = pd.read_html(url)[0]
tables.to_csv('./data/cas.csv',mode='a', encoding='utf-8', header=1, index=0)