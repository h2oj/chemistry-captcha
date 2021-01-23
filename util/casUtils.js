const fs = require('fs');
const fetch = require('node-fetch');
const stringRandom = require('string-random')

function getRandom() {
  const cas = JSON.parse(fs.readFileSync('data/cas.json'));
  return cas[Math.floor(Math.random()*cas.length-1)];
}

async function getImage() {
  const tmp = getRandom();
  const cas = tmp['cas'];
  const mf = tmp['mf']
  const path = `./tmp/${cas}.gif`;
  const key = stringRandom()
  const url = `https://www.chemicalbook.com/CAS/GIF/${cas}.gif`;
  await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/octet-stream' },
  }).then(res => res.buffer()).then(_ => {
      fs.writeFileSync(path, _, "binary");
  });
  return [cas, key, mf];
}

module.exports = getImage;