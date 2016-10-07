const babylon = require("babylon");
const sourceMap = require("source-map");

const { Generator } = require("../src");

const fs = require("fs");
const lodashSrc = fs.readFileSync(require.resolve("lodash/lodash.min"), "utf8");

const ast = babylon.parse(lodashSrc, { sourceFilename: "lodash.min.js" });

const g = new Generator({ outputFilename: "lodash.bundle.js" });
g.addSourceFile("lodash.min.js", lodashSrc);
g.generate(ast.program);
const { code, map } = g;

console.log("***** CODE *****");
console.log(code);
console.log("\n***** SOURCE MAP *****");
console.log(map.toString());
console.log("");
