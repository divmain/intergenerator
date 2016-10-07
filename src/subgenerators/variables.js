// var ...declarations;
exports.VariableDeclaration = (node, generator) => {
  generator.advance(`${node.kind} `);

  node.declarations.forEach((declaration, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(declaration);
  });

  generator.advance(";");
};

// id = init
exports.VariableDeclarator = (node, generator) => {
  generator.generate(node.id);
  if (node.init) {
    generator.advance("=");
    generator.generate(node.init);
  }
};
