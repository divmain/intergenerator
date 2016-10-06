// callee(...arguments)
exports.CallExpression = function genCallExpression (node, generator) {
  generator.generate(node.callee);
  generator.advance("(");

  node.arguments.forEach((argumentNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(argumentNode);
  });

  generator.advance(")");
};

// object.property
exports.MemberExpression = function genMemberExpr (node, generator) {
  generator.generate(node.object);
  if (node.property.type === "Identifier") {
    generator.advance(".");
    generator.generate(node.property);
  } else {
    generator.advance("[");
    generator.generate(node.property);
    generator.advance("]");
  }
};
