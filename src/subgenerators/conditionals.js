// if (test) consequent else alternate
exports.IfStatement = (node, anscestors, generator) => {
  generator.advance("if(");
  generator.generate(node.test, anscestors);
  generator.advance(")");
  generator.generate(node.consequent, anscestors);

  if (node.alternate) {
    generator.advance("else");
    generator.generate(node.alternate, anscestors);
  }
};

// condition ? a : b
exports.ConditionalExpression = (node, anscestors, generator) => {
  generator.generate(node.test, anscestors);
  generator.advance("?");
  generator.generate(node.consequent, anscestors);
  generator.advance(":");
  generator.generate(node.alternate, anscestors);
};

// switch (condition) { ...cases } ;
exports.SwitchStatement = (node, anscestors, generator) => {
  generator.advance("switch(");
  generator.generate(node.discriminant, anscestors);
  generator.advance("){");


  node.cases.forEach(caseNode => {
    generator.generate(caseNode, anscestors);
  });

  generator.advance("}");
};

// case: A
exports.SwitchCase = (node, anscestors, generator) => {
  if (node.test) {
    generator.advance("case ");
    generator.generate(node.test, anscestors);
  } else {
    generator.advance("default");
  }

  generator.advance(":");

  // SwitchCase nodes have an array of consequents, and each of
  // these will _always_ be an ExpressionStatement.  Semicolons
  // will always be inserted (elsewhere) at the of of any
  // ExpressionStatements, which means we don't have to worry
  // about it here.
  //
  // However, this also means we'll have unnecessary semicolons
  // following the last consequent of each SwitchCase.
  node.consequent.forEach(consequentNode => {
    generator.generate(consequentNode, anscestors);
  });
};
