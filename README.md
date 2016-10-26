## intergenerator

`intergenerator` is a code and source-map generator for Babel AST.  For specifically, in _only_ generates minified code.  This, along with a handful of other trade-offs, has allowed for improved performance characteristics compared to `babel-generator` itself.

At present, this library only supports ES5 code.  An error will be thrown if any unexpected node types are encountered.

More AST node types will be supported in the future.  If you don't see an issue related to an unimplemented node type, please feel free to open one.  Or even better, open a PR!

`intergenerator` is a subproject of Interlock.  For information about Interlock and how it works, check out our [website](http://interlockjs.com).


## Usage

```javascript
// Instantiate a new generator...
const g = new Generator({
  // options
});

// Add all source files...
g.addSourceFile("source-file-a.js", sourceContentA);
g.addSourceFile("source-file-b.js", sourceContentB)

// Generate code from your AST...
g.generate(ast);

// And retrieve your code and source-map.
const { code, map } = g;
```


## Options

- `sourceRoot`: Optional. The URL root from which all sources are relative.
- `outputFilename`: Optional. The generated filename the source map is associated with.
- `includeSourcemap`: Boolean. Determines whether a source-map is generated.

**Note:** Performance is roughly 3x slower at present with source-map generation enabled.


## License

[MIT License](http://opensource.org/licenses/MIT)
