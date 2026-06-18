import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const buf = fs.readFileSync(process.argv[2]);
const parser = new PDFParse();
const data = await parser.parse(buf, {max: 8});
console.log(data.text.slice(0, 5000));
