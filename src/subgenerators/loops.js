// for (init; test; update) body
exports.ForStatement = (node, generator) => {
  generator.advance("for(");
  if (node.init) { generator.generate(node.init); }
  generator.advance(";");
  if (node.test) { generator.generate(node.test); }
  generator.advance(";");
  if (node.update) { generator.generate(node.update); }
  generator.advance(")");
  generator.generate(node.body);
};
