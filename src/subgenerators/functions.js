exports.FunctionDeclaration = function genFuncDeclaration (node, generator) {
  const paramNodes = node.params;

  generator.advance("function ");
  generator.generate(node.id);
  generator.advance("(");

  node.params.forEach((paramNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(paramNode);
  });

  generator.advance("){");
  generator.generate(node.body);
  generator.advance("}");
};
