// { body }
exports.BlockStatement = (node, nodePath, generator) => {
  generator.advance("{");
  node.body.forEach(bodyNode => {
    generator.generate(bodyNode, nodePath);
  });
  generator.advance("}");
};

// expression;
exports.ExpressionStatement = (node, nodePath, generator) => {
  generator.mark(node.loc);
  generator.generate(node.expression, nodePath);
  generator.advance(";");
};

// return argument;
// eslint-disable-next-line consistent-return
exports.ReturnStatement = (node, nodePath, generator) => {
  generator.mark(node.loc);
  if (!node.argument) {
    return generator.advance("return;");
  }
  generator.advance("return ");
  generator.generate(node.argument, nodePath);
  generator.advance(";");
};

// ;
exports.EmptyStatement = (node, nodePath, generator) => {
  generator.advance(";");
};
