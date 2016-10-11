// { body }
exports.BlockStatement = (node, anscestors, generator) => {
  generator.advance("{");
  node.body.forEach(bodyNode => {
    generator.generate(bodyNode, anscestors);
  });
  generator.advance("}");
};

// expression;
exports.ExpressionStatement = (node, anscestors, generator) => {
  generator.generate(node.expression, anscestors);
  generator.advance(";");
};

// return argument;
exports.ReturnStatement = (node, anscestors, generator) => {
  if (!node.argument) {
    return generator.advance("return;");
  }
  generator.advance("return ");
  generator.generate(node.argument, anscestors);
  generator.advance(";");
};

// ;
exports.EmptyStatement = () => {};
