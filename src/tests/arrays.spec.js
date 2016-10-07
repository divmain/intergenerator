const { generate } = require("./_test-util");

test("ArrayExpression", () => {
  const src = `[thing,null,null]`;

  let { map, assertAstIsEqual } = generate(src, true);

  assertAstIsEqual();
  expect(map.mappings).toBe("EAAC");
});
