exports.StringLiteral = (node, generator) => {
  // Use JSON.stringify to properly escape the string literal.
  const code = JSON.stringify(node.value);
  generator.advance(code, node.loc);
};

exports.NumericLiteral = (node, generator) => {
  const code = node.value.toString();
  generator.advance(code, node.loc);
};

exports.NullLiteral = (node, generator) => {
  generator.advance("null");
};

exports.BooleanLiteral = (node, generator) => {
  generator.advance(node.value ? "true" : "false");
};

exports.ThisExpression = (node, generator) => {
  generator.advance("this");
};
