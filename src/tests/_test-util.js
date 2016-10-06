const babylon = require("babylon");
const sourceMap = require("source-map");

const { Generator } = require("..");


exports.generate = source => {
  const ast = babylon.parse(source, { sourceFilename: "example.js" });

  const g = new Generator({ outputFilename: "example.bundle.js" });
  g.addSourceFile("example.js", source);
  g.generate(ast.program);

  const { code, map } = g;
  return { code, map: JSON.parse(map) };
};
