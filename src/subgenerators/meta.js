exports.Program = function genStringLiteral (node, generator) {
  // Program nodes should not have their own mapping.
  node.body.forEach(bodyNode => {
    generator.generate(bodyNode);
  });
};

exports.File = function getFile (node, generator) {
  generator.generate(node.program);
};
