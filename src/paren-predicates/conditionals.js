exports.ConditionalExpression = (node, parentNodePath) => {
  const parent = parentNodePath.node;
  const parentType = parent.type;

  if (
    parentType === "SequenceExpression"
  ) {
    return true;
  }

  return false;
};
