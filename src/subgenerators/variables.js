// var ...declarations;
exports.VariableDeclaration = (node, anscestors, generator) => {
  generator.advance(`${node.kind} `);

  node.declarations.forEach((declaration, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(declaration, anscestors);
  });

  generator.advance(";");
};

// id = init
exports.VariableDeclarator = (node, anscestors, generator) => {
  generator.generate(node.id, anscestors);
  if (node.init) {
    generator.advance("=");
    generator.generate(node.init, anscestors);
  }
};
