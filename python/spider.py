import pandas as pd
url="https://www.chemicalbook.com/CASDetailList_100.htm"
tables = pd.read_html(url)[0]
tables.to_csv('cas.csv',mode='a', encoding='utf_8_sig', header=1, index=0)