exports.BlockStatement = function genBlockStatement (node, generator) {
  generator.advance("{");
  generator.generate(node.body);
  generator.advance("}");
};

exports.ExpressionStatement = function genExprStmt (node, generator) {
  generator.generate(node.expression);
  generator.advance(";");
};
