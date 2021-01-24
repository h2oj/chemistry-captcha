import pandas as pd
for i in range(1,101):
    url="https://www.chemicalbook.com/CASDetailList_%d00.htm"%i
    print(str(i) + '/100')
    tables = pd.read_html(url, encoding='utf-8')[0]
    tables.to_csv('./data/cas.csv',mode='a', encoding='utf_8', header=None, index=0)