const pdf = require('pdf-parse');
const fs = require('fs');
const buf = fs.readFileSync(process.argv[2]);
pdf(buf, {max: 8}).then(d => console.log(d.text.slice(0, 5000)));
