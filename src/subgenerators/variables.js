// var ...declarations;
exports.VariableDeclaration = function genVariableDeclaration (node, generator) {
  generator.advance(`${node.kind} `);

  node.declarations.forEach((declaration, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(declaration);
  });

  generator.advance(";");
};

// id = init
exports.VariableDeclarator = function genVariableDeclarator (node, generator) {
  generator.generate(node.id);
  generator.advance("=");
  generator.generate(node.init);
};
