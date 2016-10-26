// try block handler
exports.TryStatement = (node, nodePath, generator) => {
  generator.advance("try");
  // node.block will always be a BlockStatement
  generator.generate(node.block, nodePath);
  if (node.handler) { generator.generate(node.handler, nodePath); }
  if (node.finalizer) {
    generator.advance("finally");
    generator.generate(node.finalizer, nodePath);
  }
};

// catch (param) body
exports.CatchClause = (node, nodePath, generator) => {
  generator.advance("catch(");
  generator.generate(node.param, nodePath);
  generator.advance(")");
  // node.body will always be a BlockStatement
  generator.generate(node.body, nodePath);
};

// throw expression
exports.ThrowStatement = (node, nodePath, generator) => {
  generator.advance("throw ");
  generator.generate(node.argument, nodePath);
  generator.advance(";");
};
