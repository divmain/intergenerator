const { encode } = require("./vlq");


exports.SourceMapGenerator = class SourceMapGenerator {
  constructor () {
    this.sources = [];
    this.sourcesIdxMap = Object.create(null);
    this.names = [];
    this.namesIdxMap = Object.create(null);
    this.row = 1;
    this.col = 0;
    this.mappings = [];
  }

  setSourceContent (filename, fileContent) {
    const sources = this.sources;
    this.sourcesIdxMap[filename] = sources.length;
    sources.push({
      path: filename,
      content: fileContent,
      row: 1,
      col: 0
    });
  }

  // eslint-disable-next-line max-params,max-statements
  addMapping (filename, sourceRow, sourceCol, genRow, genCol, identifier) {
    if (!filename) { return; }

    const generatedRow = this.row;
    const generatedCol = this.col;
    const mappings = this.mappings;

    if (genRow > generatedRow) {
      // Advance the source-map line counter.
      for (let i = generatedRow; i < genRow; i++) {
        mappings.push(";");
      }
      this.row = genRow;
    } else if (generatedCol !== 0) {
      // Demarkate a new mapping.
      mappings.push(",");
    }

    // Update output cursor.
    const relativeGeneratedCol = genCol - generatedCol;
    this.col = genCol;


    // Find the source entry.
    const sourceIdx = this.sourcesIdxMap[filename];
    const source = this.sources[sourceIdx];

    // Identify the row and column relative to the last marking and update the source cursors.
    const relativeSourceRow = sourceRow - source.row;
    // Reset the column cursor if the row changes.
    if (relativeSourceRow) {
      source.col = 0;
    }
    source.row = sourceRow;
    const relativeSourceCol = sourceCol - source.col;
    source.col = sourceCol;

    encode(
      this.mappings,
      relativeGeneratedCol,
      sourceIdx,
      relativeSourceRow,
      relativeSourceCol,
      identifier && this.getIdentifierIdx(identifier)
    );
  }

  getIdentifierIdx (identifier) {
    const namesIdxMap = this.namesIdxMap;
    if (identifier in namesIdxMap) {
      return this.namesIdxMap[identifier];
    }

    const names = this.names;
    const idx = namesIdxMap[identifier] = names.length;
    names.push(identifier);

    return idx;
  }

  toString () {
    const sources = this.sources;

    const result = {};
    result.version = 3;
    result.sources = sources.map(source => source.filename);
    result.sourcesContent = sources.map(source => source.content);
    result.names = this.names;
    // Maps always end with a semicolon to demarkate the last line ending.
    this.mappings.push(";");
    result.mappings = this.mappings.join("");

    return JSON.stringify(result);
  }
};
