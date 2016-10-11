// [...elements]
exports.ArrayExpression = (node, anscestors, generator) => {
  generator.advance("[");
  node.elements.forEach((elementNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    if (elementNode !== null) {
      generator.generate(elementNode, anscestors, anscestors);
    }
  });
  generator.advance("]");
};
