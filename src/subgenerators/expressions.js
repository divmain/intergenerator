// callee(...arguments)
exports.CallExpression = (node, anscestors, generator) => {
  generator.generate(node.callee, anscestors);
  generator.advance("(");

  node.arguments.forEach((argumentNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(argumentNode, anscestors);
  });

  generator.advance(")");
};

// object.property
exports.MemberExpression = (node, anscestors, generator) => {
  generator.generate(node.object, anscestors);
  if (node.computed) {
    generator.advance("[");
    generator.generate(node.property, anscestors);
    generator.advance("]");
  } else {
    generator.advance(".");
    generator.generate(node.property, anscestors);
  }
};

// a,b,c
exports.SequenceExpression = (node, anscestors, generator) => {
  node.expressions.forEach((expressionNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(expressionNode, anscestors);
  });
};

// +argument (operator followed by argument)
// - | + | ! | ~ | typeof | void | delete
exports.UnaryExpression = (node, anscestors, generator) => {
  generator.advance(node.operator);

  switch (node.operator) {
  case "typeof":
  case "void":
  case "delete":
    generator.advance(" ");
  }

  if (node.extra && node.extra.parenthesizedArgument) { generator.advance("("); }
  generator.generate(node.argument, anscestors);
  if (node.extra && node.extra.parenthesizedArgument) { generator.advance(")"); }
};

// left === right
// == | != | === | !== | < | <= | > | >= | << | >> | >>>
// | + | - | * | / | % | | | ^ | & | in | instanceof
exports.BinaryExpression = (node, anscestors, generator) => {
  generator.generate(node.left, anscestors);

  switch (node.operator) {
  case "in":
  case "instanceof":
    generator.advance(` ${node.operator} `);
    break;
  default:
    generator.advance(node.operator);
  }

  generator.generate(node.right, anscestors);
};

// argument++
// ++ | --
exports.UpdateExpression = (node, anscestors, generator) => {
  if (node.prefix) { generator.advance(node.operator); }
  generator.generate(node.argument, anscestors);
  if (!node.prefix) { generator.advance(node.operator); }
};

// left || right
// && | ||
exports.LogicalExpression = (node, anscestors, generator) => {
  generator.generate(node.left, anscestors);
  generator.advance(node.operator);
  generator.generate(node.right, anscestors);
};

// left = right
exports.AssignmentExpression = (node, anscestors, generator) => {
  generator.generate(node.left, anscestors);
  generator.advance("=");
  generator.generate(node.right, anscestors);
};

// new callee( ...arguments )
exports.NewExpression = (node, anscestors, generator) => {
  generator.advance("new ");
  generator.generate(node.callee, anscestors);
  generator.advance("(");
  node.arguments.forEach((argumentNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(argumentNode, anscestors);
  });
  generator.advance(")");
};
