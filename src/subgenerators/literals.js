exports.StringLiteral = function genStringLiteral (node, generator) {
  // Use JSON.stringify to properly escape the string literal.
  const code = JSON.stringify(node.value);
  generator.advance(code, node.loc);
};

exports.NumericLiteral = function genNumericLiteral (node, generator) {
  const code = node.value.toString();
  generator.advance(code, node.loc);
};

exports.NullLiteral = function genNullLiteral (node, generator) {
  generator.advance("null");
};

