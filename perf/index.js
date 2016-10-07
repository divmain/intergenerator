const fs = require("fs");

const babylon = require("babylon");
const babelGenerator = require("babel-generator").default;

const { Generator } = require("../src");


const lodashSrc = fs.readFileSync(require.resolve("lodash/lodash.min"), "utf8");
const ast = babylon.parse(lodashSrc, { sourceFilename: "lodash.min.js" });


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const babelRun = () => {
  const { code, map } = babelGenerator(ast, {
    comments: false,
    compact: true,
    // minified: true
    quotes: "double",
    sourceMaps: true,
    sourceMapTarget: "lodash.bundle.js",
    sourceRoot: "/",
    sourceFileName: "lodash.min.js",
    filename: "lodash.bundle.js"
  }, lodashSrc);

  return { code, map: JSON.stringify(map) };
};

const intergeneratorRun = () => {
  const g = new Generator({ outputFilename: "lodash.bundle.js" });
  g.addSourceFile("lodash.min.js", lodashSrc);
  g.generate(ast.program);
  const { code, map } = g;

  return { code, map };
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const loop = (fn, iterations) => {
  for (let i = 0; i < iterations; i++) {
    fn();
  }
};

const executeRun = (type, fn, iterations) => {
  const label = `${type} (${iterations} iterations)`;
  console.time(label);
  loop(fn, iterations);
  console.timeEnd(label);
};

console.log("Warming up the JIT...");
loop(babelRun, 5);
loop(intergeneratorRun, 5);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


console.log("Running performance tests...\n");

executeRun("Babel", babelRun, 10);
executeRun("Babel", babelRun, 50);
executeRun("Babel", babelRun, 200);

executeRun("Intergenerator", intergeneratorRun, 10);
executeRun("Intergenerator", intergeneratorRun, 50);
executeRun("Intergenerator", intergeneratorRun, 200);
