exports.Program = (node, anscestors, generator) => {
  if (node.directives && node.directives.length) {
    node.directives.forEach(directiveNode => {
      generator.generate(directiveNode, anscestors);
    });
  }

  // Program nodes should not have their own mapping.
  node.body.forEach(bodyNode => {
    generator.generate(bodyNode, anscestors);
  });
};

exports.Directive = (node, anscestors, generator) => {
  generator.generate(node.value, anscestors);
};

exports.DirectiveLiteral = (node, anscestors, generator) => {
  generator.advance(`"${node.value}";`);
};

exports.File = (node, anscestors, generator) => {
  generator.generate(node.program, anscestors);
};
