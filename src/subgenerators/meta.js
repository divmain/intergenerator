exports.Program = (node, generator) => {
  // Program nodes should not have their own mapping.
  node.body.forEach(bodyNode => {
    generator.generate(bodyNode);
  });
};

exports.File = (node, generator) => {
  generator.generate(node.program);
};
