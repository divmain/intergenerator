const { generate } = require("./_test-util");

test("IfStatement", () => {
  const src = `if(a){b;}`;

  let { map, assertAstIsEqual } = generate(src);

  assertAstIsEqual();
  expect(map.mappings).toBe("IAAG,GAAG");
});

test("IfStatement w/ else", () => {
  const src = `if(a){b;}else{c;}`;

  let { map, assertAstIsEqual } = generate(src);

  assertAstIsEqual();
  expect(map.mappings).toBe("IAAG,GAAG,QAAQ");
});


test("ConditionalExpression", () => {
  const src = `a?b:c`;

  let { map, assertAstIsEqual } = generate(src, true);

  assertAstIsEqual();
  expect(map.mappings).toBe("CAAA,EAAE,EAAE");
});
