exports.Identifier = (node, anscestors, generator) => {
  generator.advance(node.name, node.loc);
};
