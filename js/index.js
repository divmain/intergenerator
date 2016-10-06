const getMapping = (loc, position) => {
  return {
    source: loc.filename,
    original: loc.start,

    // TODO: `position` will have to be refactored away from a character-offset to
    //       track current line and column position in the generated code.

    // NOTE: The first line and column are represented by a 1, not by a 0.
    generated: { line: 1, column: position + 1 }
  };
};


function generate (node, position) {
  let gen;

  switch (node.type) {
    case "Program":
      gen = genProgram;
      break;
    case "FunctionDeclaration":
      gen = genFuncDeclaration;
      break;
    case "Identifier":
      gen = genIdentifier;
      break;
    case "BlockStatement":
      gen = genBlockStatement;
      break;
    case "ExpressionStatement":
      gen = genExprStmt;
      break;
    case "CallExpression":
      gen = genCallExpr;
      break;
    case "MemberExpression":
      gen = genMemberExpr;
      break;
    case "VariableDeclaration":
      gen = genVariableDeclaration;
      break;
    case "VariableDeclarator":
      gen = genVariableDeclarator;
      break;
    case "ArrayExpression":
      gen = genArrayExpr;
      break;
    case "StringLiteral":
      gen = genStringLiteral;
      break;
    case "NumericLiteral":
      gen = genNumericLiteral;
      break;
    case "NullLiteral":
      gen = genNullLiteral;
      break;
    default:
      throw new Error("Unknown node type detected:", node.type);
  }

  return gen(node, position);
}


function generateChildren (children, position, separator = "") {
  const sepLength = separator.length;
  const lastIdx = children.length - 1;

  const {
    reducedCode: code,
    reducedMappings: mappings
  } = children.reduce(({ reducedCode, reducedMappings }, childNode, idx) => {
    let childCode, childMappings;

    ({
      code: childCode,
      mappings: childMappings,
      position
    } = generate(childNode, position));

    if (sepLength && idx !== lastIdx) {
      position += sepLength;
      childCode += separator;
    }

    return {
      reducedCode: reducedCode + childCode,
      reducedMappings: reducedMappings.concat(childMappings)
    };
  }, { reducedCode: "", reducedMappings: [] });

  return { code, mappings, position };
}


/**
 * NOTE: Program nodes should not have their own mapping.
 */
function genProgram (node, position) {
  return generateChildren(node.body, position);
}

function genFuncDeclaration (node, position) {
  const paramNodes = node.params;
  const mappings = [ getMapping(node.loc, position) ];

  let code = "function ";
  position.column += 9;

  let idCode, idMappings;

  ({
    code: idCode,
    mappings: idMappings,
    position
  } = generate(node.id));

  code += idCode;
  mappings = mappings.concat(idMappings);

  code += "(";
  position += 1;

  let paramsCode, paramsMappings;
  ({
    paramsCode,
    paramsMappings,
    position
  } = generateChildren(node.params, position, ","));

  code += paramsCode;
  mappings = mappings.concat(paramsMappings);

  code += "){";
  position += 2;

  let bodyCode, bodyMappings;
  ({
    bodyCode,
    bodyMappings,
    position
  } = generate(node.body, position));

  code += bodyCode;
  mappings = mappings.concat(bodyMappings);

  return { code, mappings, position };
}

function genIdentifier (node, position) {
  const mappings = [ getMapping(node.loc, position) ];
  const code = node.name;
  position += code.length;
  return { code, mappings, position };
}

function genBlockStatement (node, position) {
  let code = "{";
  position += 1;

  let mappings;
  ({
    code: childrenCode,
    mappings,
    position
  } = generateChildren(node.body, position));

  code += "}";
  position += 1;

  return { code, mappings, position };
}

function genExprStmt (node, position) {
  let code, mappings;
  ({
    code,
    mappings,
    position
  } = generate(node.expression, position));

  code += ";";
  position += 1;

  return { code, mappings, position };
}

function genCallExpr (node, position) {
  let mappings = [ getMapping(node.loc, position) ];

  let code, calleeMappings;
  ({
    code,
    mappings: calleeMappings,
    position
  } = generate(node.callee, position));

  mappings = mappings.concat(calleeMappings);

  code += "(";
  position += 1;

  let argsCode, argsMappings;
  ({
    code: argsCode,
    mappings: argsMappings,
    position
  } = generateChildren(node.arguments, position, ","));

  code += argsCode;
  mappings = mappings.concat(argsMappings);

  code += ")";
  position += 1;

  return { code, mappings, position };
}

function genMemberExpr (node, position) {
  let mappings = [ getMapping(node.loc, position) ];

  let code, objectMappings;
  ({
    code,
    mappings: objectMappings,
    position
  } = generate(node.object, position));

  mappings = mappings.concat(objectMappings);

  if (node.property.type === "Identifier") {
    code += ".";
    position += 1;
  } else {
    code += "[";
    position += 1;
  }

  let propCode, propMappings;
  ({
    code: propCode,
    mappings: propMappings,
    position
  } = generate(node.property, position));

  code += propCode;
  mappings = mappings.concat(propMappings);

  if (node.property.type !== "Identifier") {
    code += "]";
    position += 1;
  }

  return { code, mappings, position };
}

function genVariableDeclaration (node, position) {
  let mappings = [ getMapping(node.loc, position) ];

  let code = `${node.kind} `;
  position += code.length;

  let declaratorsCode, declaratorsMappings;
  ({
    code: declaratorsCode,
    mappings: declaratorsMappings,
    position
  } = generateChildren(node.declarations, position, ","));

  code += declaratorsCode;
  mappings = mappings.concat(declaratorsMappings);

  code += ";";
  position += 1;

  return { code, mappings, position };
}

function genVariableDeclarator (node, position) {
  let mappings = [ getMapping(node.loc, position) ];

  let code, idMappings;
  ({
    code,
    mappings: idMappings,
    position
  } = generate(node.id, position));

  mappings = mappings.concat(idMappings);

  code += "=";
  position += 1;

  let initCode, initMappings;
  ({
    code: initCode,
    mappings: initMappings,
    position
  } = generate(node.init, position));

  code += initCode;
  mappings = mappings.concat(initMappings);

  return { code, position, mappings };
}

function genArrayExpr (node, position) {
  let mappings = [ getMapping(node.loc, position) ];

  let code = "[";
  position += 1;

  let childrenCode, childrenMappings;
  ({
    code: childrenCode,
    mappings: childrenMappings,
    position
  } = generateChildren(node.elements, position, ","));

  code += childrenCode;
  mappings = mappings.concat(childrenMappings);

  code += "]";
  position += 1;

  return { code, position, mappings };
}

function genStringLiteral (node, position) {
  const mappings = [ getMapping(node.loc, position) ];
  const code = `"${node.value}"`;
  position += code.length;
  return { code, mappings, position };
}

function genNumericLiteral (node, position) {
  const mappings = [ getMapping(node.loc, position) ];
  const code = node.value.toString();
  position += code.length;
  return { code, mappings, position };
}

function genNullLiteral (node, position) {
  const mappings = [];
  const code = "null";
  position += 4;
  return { code, mappings, position };
}


module.exports = generate;
