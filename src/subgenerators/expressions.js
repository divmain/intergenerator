// callee(...arguments)
exports.CallExpression = (node, nodePath, generator) => {
  generator.generate(node.callee, nodePath);
  generator.advance("(");

  node.arguments.forEach((argumentNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(argumentNode, nodePath);
  });

  generator.advance(")");
};

// object.property
exports.MemberExpression = (node, nodePath, generator) => {
  generator.generate(node.object, nodePath);
  if (node.computed) {
    generator.advance("[");
    generator.generate(node.property, nodePath);
    generator.advance("]");
  } else {
    generator.advance(".");
    generator.generate(node.property, nodePath);
  }
};

// a,b,c
exports.SequenceExpression = (node, nodePath, generator) => {
  node.expressions.forEach((expressionNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(expressionNode, nodePath);
  });
};

// +argument (operator followed by argument)
// - | + | ! | ~ | typeof | void | delete
exports.UnaryExpression = (node, nodePath, generator) => {
  generator.advance(node.operator);

  switch (node.operator) {
  case "typeof":
  case "void":
  case "delete":
    generator.advance(" ");
  }

  if (node.extra && node.extra.parenthesizedArgument) { generator.advance("("); }
  generator.generate(node.argument, nodePath);
  if (node.extra && node.extra.parenthesizedArgument) { generator.advance(")"); }
};

// left === right
// == | != | === | !== | < | <= | > | >= | << | >> | >>>
// | + | - | * | / | % | | | ^ | & | in | instanceof
exports.BinaryExpression = (node, nodePath, generator) => {
  generator.generate(node.left, nodePath);

  switch (node.operator) {
  case "in":
  case "instanceof":
    generator.advance(` ${node.operator} `);
    break;
  default:
    generator.advance(node.operator);
  }

  generator.generate(node.right, nodePath);
};

// argument++
// ++ | --
exports.UpdateExpression = (node, nodePath, generator) => {
  if (node.prefix) { generator.advance(node.operator); }
  generator.generate(node.argument, nodePath);
  if (!node.prefix) { generator.advance(node.operator); }
};

// left || right
// && | ||
exports.LogicalExpression = (node, nodePath, generator) => {
  generator.generate(node.left, nodePath);
  generator.advance(node.operator);
  generator.generate(node.right, nodePath);
};

// left = right
exports.AssignmentExpression = (node, nodePath, generator) => {
  generator.generate(node.left, nodePath);
  generator.advance(node.operator);
  generator.generate(node.right, nodePath);
};

// new callee( ...arguments )
exports.NewExpression = (node, nodePath, generator) => {
  generator.advance("new ");
  generator.generate(node.callee, nodePath);
  generator.advance("(");
  node.arguments.forEach((argumentNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(argumentNode, nodePath);
  });
  generator.advance(")");
};
