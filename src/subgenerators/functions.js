// function id (...params) { body }
exports.FunctionDeclaration = (node, generator) => {
  generator.advance("function ");
  generator.generate(node.id);
  generator.advance("(");

  node.params.forEach((paramNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(paramNode);
  });

  generator.advance(")");
  generator.generate(node.body);
};

// function id (...params) { body }
exports.FunctionExpression = (node, generator) => {
  generator.advance("function");

  if (node.id) {
    generator.advance(" ");
    generator.generate(node.id);
  }

  generator.advance("(");

  node.params.forEach((paramNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(paramNode);
  });

  generator.advance(")");
  generator.generate(node.body);
};
