// try block handler
exports.TryStatement = (node, generator) => {
  generator.advance("try");
  // node.block will always be a BlockStatement
  generator.generate(node.block);
  node.handler && generator.generate(node.handler);
  node.finalizer && generator.generate(node.finalizer);
};

// catch (param) body
exports.CatchClause = (node, generator) => {
  generator.advance("catch(");
  generator.generate(node.param);
  generator.advance(")");
  // node.body will always be a BlockStatement
  generator.generate(node.body);
};

// throw expression
exports.ThrowStatement = (node, generator) => {
  generator.advance("throw ");
  generator.generate(node.argument);
};
