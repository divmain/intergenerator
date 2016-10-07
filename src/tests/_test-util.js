const babylon = require("babylon");
const sourceMap = require("source-map");

const { Generator } = require("..");


const INPUT_FILE = "example.js";
const OUTPUT_FILE = "example.bundle.js";


exports.generate = (source, singleExpression = false) => {
  const getAst = src => {
    const rootAst = babylon.parse(src, {
      allowReturnOutsideFunction: true,
      allowImportExportEverywhere: true,
      sourceFilename: INPUT_FILE,
      plugins: [
        "jsx",
        "flow",
        "doExpressions",
        "objectRestSpread",
        "decorators",
        "classProperties",
        "exportExtensions",
        "asyncGenerators",
        "functionBind",
        "functionSent"
      ]
    });
    return singleExpression ? rootAst.program.body[0].expression : rootAst;
  }

  const ast = getAst(source);

  const g = new Generator({ outputFilename: OUTPUT_FILE });
  g.addSourceFile(INPUT_FILE, source);
  g.generate(ast);

  const { code, map } = g;

  return {
    map: JSON.parse(map),
    code,
    ast,
  };
};

exports.dedent = (by, str) => str
  .split("\n")
  .filter(line => line.length >= by)
  .map(line => line.slice(by))
  .join("\n");
