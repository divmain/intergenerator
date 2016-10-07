const { generate, dedent } = require("./_test-util");

test("ReturnStatement", () => {
  const src = "return a;";

  let { map, assertAstIsEqual } = generate(src);

  assertAstIsEqual();
  expect(map.mappings).toBe("QAAO");
});
