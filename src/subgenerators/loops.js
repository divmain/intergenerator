// for (init; test; update) body
exports.ForStatement = (node, generator) => {
  generator.advance("for(");
  if (node.init) { generator.generate(node.init); }
  generator.advance(";");
  if (node.test) { generator.generate(node.test); }
  generator.advance(";");
  if (node.update) { generator.generate(node.update); }
  generator.advance(")");
  generator.generate(node.body);
};

// for (left in right) body
exports.ForInStatement = (node, generator) => {
  generator.advance("for(");
  generator.generate(node.left);
  generator.advance(" in ");
  generator.generate(node.right);
  generator.advance(")");
  // node.body will always be a statement
  generator.generate(node.body);
};

// do body while (test)
exports.DoWhileStatement = (node, generator) => {
  generator.advance("do ");
  // node.body will always be a statement
  generator.generate(node.body);
  generator.advance("while(");
  generator.generate(node.test);
  generator.advance(")");
};

// label: body
exports.LabeledStatement = (node, generator) => {
  generator.generate(node.label);
  generator.advance(":");
  generator.generate(node.body);
};

// continue label;
exports.ContinueStatement = (node, generator) => {
  generator.advance("continue");
  if (node.label) {
    generator.advance(" ");
    generator.generate(node.label);
  }
  generator.advance(";");
};

// break label;
exports.BreakStatement = (node, generator) => {
  generator.advance("break");
  if (node.label) {
    generator.advance(" ");
    generator.generate(node.label);
  }
  generator.advance(";");
};
