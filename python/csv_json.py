import json

things = []

for i in open('./data/cas.csv', encoding='utf-8'):
    things.append({'cas': i.split(',')[0], 'mf': i.split(',')[1].replace('\n','')})
json.dump(things, open('./data/cas.json', mode='w'))