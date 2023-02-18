const fs = require('fs');

// Read Data
const data = fs.readFileSync('./homework.log', 'utf-8');
console.log(data);

// Write Data
fs.writeFileSync('./log.txt', data, 'utf-8');
console.log('Successfully Written');
