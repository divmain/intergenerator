exports.Identifier = (node, generator) => {
  generator.advance(node.name, node.loc);
};
