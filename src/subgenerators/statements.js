// { body }
exports.BlockStatement = (node, generator) => {
  generator.advance("{");
  node.body.forEach(bodyNode => {
  	generator.generate(bodyNode);
  });
  generator.advance("}");
};

// expression;
exports.ExpressionStatement = (node, generator) => {
  generator.generate(node.expression);
  generator.advance(";");
};

// return argument;
exports.ReturnStatement = (node, generator) => {
  generator.advance("return ");
  generator.generate(node.argument);
  generator.advance(";");
};

// ;
exports.EmptyStatement = (node, generator) => {
  generator.advance(";");
};
