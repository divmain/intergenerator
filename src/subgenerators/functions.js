// function id (...params) { body }
exports.FunctionDeclaration = (node, anscestors, generator) => {
  generator.advance("function ");
  generator.generate(node.id, anscestors);
  generator.advance("(");

  node.params.forEach((paramNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(paramNode, anscestors);
  });

  generator.advance(")");
  generator.generate(node.body, anscestors);
};

// function id (...params) { body }
exports.FunctionExpression = (node, anscestors, generator) => {
  generator.advance("function");

  if (node.id) {
    generator.advance(" ");
    generator.generate(node.id, anscestors);
  }

  generator.advance("(");

  node.params.forEach((paramNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(paramNode, anscestors);
  });

  generator.advance(")");
  generator.generate(node.body, anscestors);
};
