// var ...declarations;
exports.VariableDeclaration = (node, nodePath, generator) => {
  generator.advance(`${node.kind} `);

  node.declarations.forEach((declaration, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(declaration, nodePath);
  });

  const parentNode = nodePath.parent.node;
  const parentNodeType = parentNode.type;

  if (
    // `for (var x in a) {}`       There should be no semicolon following `x`.
    parentNodeType === "ForInStatement" ||
    // `for (var i = 1; i++;) {}`  The semicolon will be inserted by the ForStatement
    //                             generator.
    parentNodeType === "ForStatement"
  ) {
    // The above semicolon exclusions are only true if the variable declaration falls
    // within the parenthesis, not if it is the statement's body.
    if (parentNode.body !== node) { return; }
  }

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
