// var ...declarations;
exports.VariableDeclaration = (node, nodePath, generator) => {
  generator.advance(`${node.kind} `);

  node.declarations.forEach((declaration, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(declaration, nodePath);
  });

  generator.advance(";");
};

// id = init
exports.VariableDeclarator = (node, nodePath, generator) => {
  generator.generate(node.id, nodePath);
  if (node.init) {
    generator.advance("=");
    generator.generate(node.init, nodePath);
  }
};
