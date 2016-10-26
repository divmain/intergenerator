exports.SequenceExpression = (node, parentNodePath) => {
  const parent = parentNodePath.node;
  const parentType = parent.type;

  if (
    parentType === "ForStatement" ||
    parentType === "ExpressionStatement" ||
    parentType === "ReturnStatement" ||
    parentType === "ThrowStatement" ||
    parentType === "ConditionalExpression" ||
    parentType === "SwitchStatement" && parent.discriminant === node ||
    parentType === "WhileStatement" && parent.test === node ||
    parentType === "IfStatement" && parent.test === node ||
    parentType === "ForInStatement" && parent.right === node
  ) {
    return false;
  }

  return true;
};

const OPERATOR_PRECEDENCE = {
  "||": 0,
  "&&": 1,
  "|": 2,
  "^": 3,
  "&": 4,
  "==": 5,
  "===": 5,
  "!=": 5,
  "!==": 5,
  "<": 6,
  ">": 6,
  "<=": 6,
  ">=": 6,
  "in": 6,
  "instanceof": 6,
  ">>": 7,
  "<<": 7,
  ">>>": 7,
  "+": 8,
  "-": 8,
  "*": 9,
  "/": 9,
  "%": 9,
  "**": 10
};

const isBinaryType = type =>
  type === "BinaryExpression" ||
  type === "LogicalExpression";

const isUnaryType = type =>
  type === "UnaryExpression";

const unaryOrBinary = (node, parent) => {
  const parentType = parent.type;

  if (
    parentType === "CallExpression" ||
    parentType === "NewExpression" && parent.callee === node ||
    parentType === "UnaryExpression" ||
    parentType === "isMemberExpression" && parent.object === node
  ) {
    return true;
  }

  if (isBinaryType(parentType)) {
    const parentPos = OPERATOR_PRECEDENCE[parent.operator];
    const nodePos = OPERATOR_PRECEDENCE[node.operator];
    if (parentPos > nodePos) { return true; }

    if (
      parentPos === nodePos &&
      parent.right === node &&
      // Logical expressions with the same precedence don't need parens.
      parentType !== "LogicalExpression"
    ) {
      return true;
    }
  }

  return false;
};

exports.BinaryExpression = (node, parentNodePath) => {
  const parent = parentNodePath.node;
  const parentType = parent.type;

  if (node.operator === "in") {
    if (
      // let i = (1 in []);
      parentType === "isVariableDeclarator" ||
      parentType === "ForStatement"
    ) {
      return true;
  }
  }

  return unaryOrBinary(node, parent);
};

exports.UnaryExpression = (node, parentNodePath) => {
  const parent = parentNodePath.node;
  return unaryOrBinary(node, parent);
};

exports.LogicalExpression = (node, parentNodePath) => {
  const parent = parentNodePath.node;
  return unaryOrBinary(node, parent);
};

exports.AssignmentExpression = (node, parentNodePath) => {
  const parent = parentNodePath.node;
  const parentType = parent.type;

  if (
    isUnaryType(parentType) ||
    isBinaryType(parentType) ||
    parentType === "ConditionalExpression" && parent.test === node ||
    parentType === "MemberExpression" && parent.object === node ||
    parentType === "CallExpression" && parent.callee === node ||
    parentType === "NewExpression" && parent.callee === node
  ) {
    return true;
  }

  return false;
};
