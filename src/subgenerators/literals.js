exports.StringLiteral = (node, nodePath, generator) => {
  const extra = node.extra;

  const code = extra && extra.raw !== null && node.value === extra.rawValue ?
    // If nodes already include necessary meta-data to avoid rendering, use that.
    extra.raw :
    // Otherwise, use JSON.stringify to properly escape the string literal.
    JSON.stringify(node.value);

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
