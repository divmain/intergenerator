exports.BlockStatement = function genBlockStatement (node, generator) {
  generator.advance("{");
  node.body.forEach(bodyNode => {
  	generator.generate(bodyNode);
  });
  generator.advance("}");
};

exports.ExpressionStatement = function genExprStmt (node, generator) {
  generator.generate(node.expression);
  generator.advance(";");
};

exports.ReturnStatement = function genReturnStatement (node, generator) {
  generator.advance("return ");
  generator.generate(node.argument);
  generator.advance(";");
};