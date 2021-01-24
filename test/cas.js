const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

fs.createReadStream(path.resolve(__dirname, '../data', 'cas.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => console.log(row))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));