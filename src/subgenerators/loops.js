// for (init; test; update) body
exports.ForStatement = (node, anscestors, generator) => {
  generator.advance("for(");
  if (node.init) { generator.generate(node.init, anscestors); }
  generator.advance(";");
  if (node.test) { generator.generate(node.test, anscestors); }
  generator.advance(";");
  if (node.update) { generator.generate(node.update, anscestors); }
  generator.advance(")");
  generator.generate(node.body, anscestors);
};

// for (left in right) body
exports.ForInStatement = (node, anscestors, generator) => {
  generator.advance("for(");
  generator.generate(node.left, anscestors);
  generator.advance(" in ");
  generator.generate(node.right, anscestors);
  generator.advance(")");
  // node.body will always be a statement
  generator.generate(node.body, anscestors);
};

// do body while (test)
exports.DoWhileStatement = (node, anscestors, generator) => {
  generator.advance("do ");
  // node.body will always be a statement
  generator.generate(node.body, anscestors);
  generator.advance("while(");
  generator.generate(node.test, anscestors);
  generator.advance(")");
};

// label: body
exports.LabeledStatement = (node, anscestors, generator) => {
  generator.generate(node.label, anscestors);
  generator.advance(":");
  generator.generate(node.body, anscestors);
};

// continue label;
exports.ContinueStatement = (node, anscestors, generator) => {
  generator.advance("continue");
  if (node.label) {
    generator.advance(" ");
    generator.generate(node.label, anscestors);
  }
  generator.advance(";");
};

// break label;
exports.BreakStatement = (node, anscestors, generator) => {
  generator.advance("break");
  if (node.label) {
    generator.advance(" ");
    generator.generate(node.label, anscestors);
  }
  generator.advance(";");
};
