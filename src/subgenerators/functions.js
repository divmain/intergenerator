// function id (...params) { body }
exports.FunctionDeclaration = (node, nodePath, generator) => {
  generator.advance("function ", node.loc);
  generator.generate(node.id, nodePath);
  generator.advance("(");

  node.params.forEach((paramNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(paramNode, nodePath);
  });

  generator.advance(")");
  generator.generate(node.body, nodePath);
};

// function id (...params) { body }
exports.FunctionExpression = (node, nodePath, generator) => {
  generator.advance("function", node.loc);

  if (node.id) {
    generator.advance(" ");
    generator.generate(node.id, nodePath);
  }

  generator.advance("(");

  node.params.forEach((paramNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(paramNode, nodePath);
  });

  generator.advance(")");
  generator.generate(node.body, nodePath);
};
