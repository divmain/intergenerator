// { ...properties }
exports.ObjectExpression = (node, generator) => {
  generator.advance("{");
  node.properties.forEach((propertyNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(propertyNode);
  });
  generator.advance("}");
};

// key: value
exports.ObjectProperty = (node, generator) => {
  generator.generate(node.key);
  generator.advance(":");
  generator.generate(node.value);
};
