// for (init; test; update) body
exports.ForStatement = (node, nodePath, generator) => {
  generator.advance("for(");
  if (node.init) { generator.generate(node.init, nodePath); }
  generator.advance(";");
  if (node.test) { generator.generate(node.test, nodePath); }
  generator.advance(";");
  if (node.update) { generator.generate(node.update, nodePath); }
  generator.advance(")");
  generator.generate(node.body, nodePath);
};

// for (left in right) body
exports.ForInStatement = (node, nodePath, generator) => {
  generator.advance("for(");
  generator.generate(node.left, nodePath);
  generator.advance(" in ");
  generator.generate(node.right, nodePath);
  generator.advance(")");
  // node.body will always be a statement
  generator.generate(node.body, nodePath);
};

// do body while (test)
exports.DoWhileStatement = (node, nodePath, generator) => {
  generator.advance("do ");
  // node.body will always be a statement
  generator.generate(node.body, nodePath);
  generator.advance("while(");
  generator.generate(node.test, nodePath);
  generator.advance(")");
};

// label: body
exports.LabeledStatement = (node, nodePath, generator) => {
  generator.generate(node.label, nodePath);
  generator.advance(":");
  generator.generate(node.body, nodePath);
};

// continue label;
exports.ContinueStatement = (node, nodePath, generator) => {
  generator.advance("continue");
  if (node.label) {
    generator.advance(" ");
    generator.generate(node.label, nodePath);
  }
  generator.advance(";");
};

// break label;
exports.BreakStatement = (node, nodePath, generator) => {
  generator.advance("break");
  if (node.label) {
    generator.advance(" ");
    generator.generate(node.label, nodePath);
  }
  generator.advance(";");
};
