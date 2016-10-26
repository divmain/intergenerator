exports.StringLiteral = (node, nodePath, generator) => {
  // Use JSON.stringify to properly escape the string literal.
  const code = JSON.stringify(node.value);
  generator.advance(code, node.loc);
};

exports.NumericLiteral = (node, nodePath, generator) => {
  const code = node.value.toString();
  generator.advance(code, node.loc);
};

exports.NullLiteral = (node, nodePath, generator) => {
  generator.advance("null");
};

exports.BooleanLiteral = (node, nodePath, generator) => {
  generator.advance(node.value ? "true" : "false");
};

exports.ThisExpression = (node, nodePath, generator) => {
  generator.advance("this");
};

exports.RegExpLiteral = (node, nodePath, generator) => {
  generator.advance(`/${node.pattern}/${node.flags}`);
};
