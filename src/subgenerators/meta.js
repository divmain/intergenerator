exports.Program = (node, nodePath, generator) => {
  if (node.directives && node.directives.length) {
    node.directives.forEach(directiveNode => {
      generator.generate(directiveNode, nodePath);
    });
  }

  // Program nodes should not have their own mapping.
  node.body.forEach(bodyNode => {
    generator.generate(bodyNode, nodePath);
  });
};

exports.Directive = (node, nodePath, generator) => {
  generator.generate(node.value, nodePath);
};

exports.DirectiveLiteral = (node, nodePath, generator) => {
  generator.advance(`"${node.value}";`);
};

exports.File = (node, nodePath, generator) => {
  generator.generate(node.program, nodePath);
};
