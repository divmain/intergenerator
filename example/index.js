const babylon = require("babylon");
const sourceMap = require("source-map");

const { Generator } = require("../src");


const example = `
var myVariable = "thing";
var other = 5;
var final = null;
console.log(myVariable);
`;

const ast = babylon.parse(example, { sourceFilename: "example.js" });

const g = new Generator({ outputFilename: "example.bundle.js" });
g.addSourceFile("example.js", example);
g.generate(ast.program);
const { code, map } = g;

console.log("***** CODE *****");
console.log(code);
console.log("\n***** SOURCE MAP *****");
console.log(map.toString());
console.log("");
