const { generate } = require("./_test-util");

test("ReturnStatement", () => {
  const src = "return a;";

  const { map, assertAstIsEqual } = generate(src);

  assertAstIsEqual();
  expect(map.mappings).toBe("QAAO");
});
