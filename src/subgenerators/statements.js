// { body }
exports.BlockStatement = function genBlockStatement (node, generator) {
  generator.advance("{");
  node.body.forEach(bodyNode => {
  	generator.generate(bodyNode);
  });
  generator.advance("}");
};

// expression;
exports.ExpressionStatement = function genExprStmt (node, generator) {
  generator.generate(node.expression);
  generator.advance(";");
};

// return argument;
exports.ReturnStatement = function genReturnStatement (node, generator) {
  generator.advance("return ");
  generator.generate(node.argument);
  generator.advance(";");
};
