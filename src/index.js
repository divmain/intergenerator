const { SourceMapGenerator } = require("source-map");


const subgenerators = require("./subgenerators");
const parenPredicates = require("./paren-predicates");


const getNodePath = (node, parentNodePath) => ({
  node,
  parent: parentNodePath
});


exports.Generator = class Generator {
  constructor (opts = {}) {
    const {
      sourceRoot,
      outputFilename,
      includeSourcemap = true
    } = opts;

    if (!outputFilename) {
      throw new Error(
        "You must provide an output filename to the Generator constructor."
      );
    }

    this.includeSourcemap = includeSourcemap;
    this.sourceMapGenerator = includeSourcemap ?
      new SourceMapGenerator({
        file: outputFilename,
        sourceRoot
      }) :
      null;
    this.mark = includeSourcemap ? this._mark : () => {};

    this.row = 0;
    this.column = 0;
    this.codeSegments = [];
  }

  addSourceFile (filename, fileContent) {
    if (!this.includeSourcemap) {
      throw new Error("You cannot define source files when sourcemap output is disabled.");
    }
    this.sourceMapGenerator.setSourceContent(filename, fileContent);
  }

  generate (node, parentNodePath) {
    const subgenerator = subgenerators[node.type];
    if (!subgenerator) {
      throw new Error(`Unknown node type detected: "${node.type}"`);
    }

    const parenPredicate = parenPredicates[node.type];
    const shouldParenthesize = node.extra ?
      node.extra.parenthesized :
      parenPredicate && parenPredicate(node, parentNodePath);

    if (shouldParenthesize) { this.advance("("); }
    subgenerator(node, getNodePath(node, parentNodePath), this);
    if (shouldParenthesize) { this.advance(")"); }
  }

  advance (codeSegment, loc, multiline = false) {
    if (loc) { this.mark(loc); }

    if (multiline) {
      throw new Error("Multiline support is not implemented...");
    } else {
      this.column += codeSegment.length;
    }

    this.codeSegments.push(codeSegment);
  }

  _mark (loc) {
    this.sourceMapGenerator.addMapping({
      source: loc.filename,
      original: loc.start,
      generated: {
        // With source-maps, lines and columns are one-indexed.
        line: this.row + 1,
        column: this.column + 1
      }
    });
  }

  get code () {
    return this.codeSegments.join("");
  }

  get map () {
    return this.includeSourcemap ? this.sourceMapGenerator.toString() : null;
  }
};
