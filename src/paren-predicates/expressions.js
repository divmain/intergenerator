exports.SequenceExpression = (node, anscestors) => {
  const parent = anscestors.next();
  const parentType = parent.type;

  if (
    parentType === "ForStatement" ||
    parentType === "ExpressionStatement" ||
    parentType === "ReturnStatement" ||
    parentType === "ThrowStatement" ||
    parentType === "SwitchStatement" && parent.discriminant === node ||
    parentType === "WhileStatement" && parent.test === node ||
    parentType === "IfStatement" && parent.test === node ||
    parentType === "ForInStatement" && parent.right === node
  ) {
    return false;
  }

  return true;
};
