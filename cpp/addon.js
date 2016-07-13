const babylon = require('babylon');
const generate = require('babel-generator').default;
const fs = require('fs');
const path = require('path');

const lodashRaw = fs.readFileSync(require.resolve('lodash'), 'utf8');
const ast = babylon.parse(lodashRaw);

// console.time('babel generator');
// const babelGeneratedSource = generate(ast, {}, lodashRaw);
// console.timeEnd('babel generator');

console.time("stringify")
const jsonAst = JSON.stringify(ast);
console.timeEnd("stringify");

console.time("native");
const addon = require('./build/Release/addon');

addon.generateAsync(jsonAst, () => console.log('yo'));
console.timeEnd("native");