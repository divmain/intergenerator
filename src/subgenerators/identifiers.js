exports.Identifier = (node, nodePath, generator) => {
  generator.advance(node.name, node.loc);
};
