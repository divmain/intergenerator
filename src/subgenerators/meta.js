exports.Program = (node, generator) => {
  if (node.directives && node.directives.length) {
    node.directives.forEach(directiveNode => {
      generator.generate(directiveNode);
    });
  }

  // Program nodes should not have their own mapping.
  node.body.forEach(bodyNode => {
    generator.generate(bodyNode);
  });
};

exports.Directive = (node, generator) => {
  generator.generate(node.value);
};

exports.DirectiveLiteral = (node, generator) => {
  generator.advance(`"${node.value}";`);
};

exports.File = (node, generator) => {
  generator.generate(node.program);
};
