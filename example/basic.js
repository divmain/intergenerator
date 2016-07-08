const babylon = require("babylon");
const sourceMap = require("source-map");

const generate = require("..");


const example = `
var myVariable = "thing";
var other = 5;
var final = null;
console.log(myVariable);
`;

const ast = babylon.parse(example, { sourceFilename: "example.js" });

const { code, mappings, position: length } = generate(ast.program, 0);

const map = new sourceMap.SourceMapGenerator({
  file: "example.bundle.js",
  sourceRoot: "/"
});
map.setSourceContent("example.js", example);

mappings.forEach(map.addMapping.bind(map));

console.log("***** CODE *****");
console.log(code);
console.log("\n***** SOURCE MAP *****");
console.log(map.toString());
console.log("");
