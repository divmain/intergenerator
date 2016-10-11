// { ...properties }
exports.ObjectExpression = (node, anscestors, generator) => {
  generator.advance("{");
  node.properties.forEach((propertyNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(propertyNode, anscestors);
  });
  generator.advance("}");
};

// key: value
exports.ObjectProperty = (node, anscestors, generator) => {
  generator.generate(node.key, anscestors);
  generator.advance(":");
  generator.generate(node.value, anscestors);
};
