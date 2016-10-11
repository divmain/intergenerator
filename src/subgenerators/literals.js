exports.StringLiteral = (node, anscestors, generator) => {
  // Use JSON.stringify to properly escape the string literal.
  const code = JSON.stringify(node.value);
  generator.advance(code, node.loc);
};

exports.NumericLiteral = (node, anscestors, generator) => {
  const code = node.value.toString();
  generator.advance(code, node.loc);
};

exports.NullLiteral = (node, anscestors, generator) => {
  generator.advance("null");
};

exports.BooleanLiteral = (node, anscestors, generator) => {
  generator.advance(node.value ? "true" : "false");
};

exports.ThisExpression = (node, anscestors, generator) => {
  generator.advance("this");
};

exports.RegExpLiteral = (node, anscestors, generator) => {
  generator.advance(`/${node.pattern}/${node.flags}`);
};
