// callee(...arguments)
exports.CallExpression = (node, generator) => {
  generator.generate(node.callee);
  generator.advance("(");

  node.arguments.forEach((argumentNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(argumentNode);
  });

  generator.advance(")");
};

// object.property
exports.MemberExpression = (node, generator) => {
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

// a,b,c
exports.SequenceExpression = (node, generator) => {
  if (node.extra && node.extra.parenthesized) { generator.advance("("); }
  node.expressions.forEach((expressionNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(expressionNode);
  });
  if (node.extra && node.extra.parenthesized) { generator.advance(")"); }
};

// +argument (operator followed by argument)
// - | + | ! | ~ | typeof | void | delete
exports.UnaryExpression = (node, generator) => {
  generator.advance(node.operator);

  switch (node.operator) {
    case "typeof":
    case "void":
    case "delete":
      generator.advance(" ");
  }

  if (node.extra.parenthesizedArgument) { generator.advance("("); }
  generator.generate(node.argument);
  if (node.extra.parenthesizedArgument) { generator.advance(")"); }
};

// left === right
// == | != | === | !== | < | <= | > | >= | << | >> | >>>
// | + | - | * | / | % | | | ^ | & | in | instanceof
exports.BinaryExpression = (node, generator) => {
  generator.generate(node.left);

  switch (node.operator) {
    case "in":
    case "instanceof":
      generator.advance(` ${node.operator} `);
      break;
    default:
      generator.advance(node.operator);
  }

  generator.generate(node.right);
};

// argument++
// ++ | --
exports.UpdateExpression = (node, generator) => {
  if (node.prefix) { generator.advance(node.operator); }
  generator.generate(node.argument);
  if (!node.prefix) { generator.advance(node.operator); }
};

// left || right
// && | ||
exports.LogicalExpression = (node, generator) => {
  generator.generate(node.left);
  generator.advance(node.operator);
  generator.generate(node.right);
};
