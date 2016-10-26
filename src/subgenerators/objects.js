// { ...properties }
exports.ObjectExpression = (node, nodePath, generator) => {
  generator.advance("{");
  node.properties.forEach((propertyNode, idx) => {
    if (idx !== 0) { generator.advance(","); }
    generator.generate(propertyNode, nodePath);
  });
  generator.advance("}");
};

// key: value
exports.ObjectProperty = (node, nodePath, generator) => {
  generator.generate(node.key, nodePath);
  generator.advance(":");
  generator.generate(node.value, nodePath);
};
