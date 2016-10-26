/* eslint-disable no-console */

const fs = require("fs");

const babylon = require("babylon");
const babelGenerator = require("babel-generator").default;

const t = require("./text");
const { Generator } = require("../src");


const lodashSrcPath = require.resolve("lodash/lodash.min");
const lodashSrc = fs.readFileSync(lodashSrcPath, "utf8");
const ast = babylon.parse(lodashSrc, { sourceFilename: "lodash.min.js" });


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const babelRun = () => {
  const { code, map } = babelGenerator(ast, {
    comments: false,
    compact: true,
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


const getTime = () => {
  const time = process.hrtime();
  return time[0] * 1e3 + time[1] / 1e6;
};

const loop = (fn, iterations) => {
  for (let i = 0; i < iterations; i++) {
    fn();
  }
};

// eslint-disable-next-line max-statements
const executeRun = iterations => {
  console.log(`===== ${t(`${iterations} iterations`).color(t.yellow)} =====\n`);

  process.stdout.write("  babel-generator: ");
  const babelStart = getTime();
  loop(babelRun, iterations);
  const babelEnd = getTime();
  const babelElapsed = Math.floor(babelEnd - babelStart);
  console.log(`${babelElapsed} milliseconds`);

  process.stdout.write("  intergenerator: ");
  const intergStart = getTime();
  loop(intergeneratorRun, iterations);
  const intergEnd = getTime();
  const intergElapsed = Math.floor(intergEnd - intergStart);
  process.stdout.write(`${intergElapsed} milliseconds`);

  const ratio = Math.floor(100 * babelElapsed / intergElapsed) / 100;
  console.log(` (${t(`${ratio}x faster`).color(t.green)})`);
  console.log("");
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


console.log("\nWarming up the JIT...");
console.log(`File: ${lodashSrcPath}\n`);
loop(babelRun, 5);
loop(intergeneratorRun, 5);

console.log("Running performance tests...\n");

executeRun(10);
executeRun(50);
executeRun(200);
executeRun(500);
