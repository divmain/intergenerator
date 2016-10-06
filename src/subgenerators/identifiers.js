exports.Identifier = function genIdentifier (node, generator) {
  generator.advance(node.name, node.loc);
};
