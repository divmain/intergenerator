const { generate } = require("./_test-util");

test("ArrayExpression", () => {
  const src = `[thing,null,null]`;

  let { map, astIsEqual } = generate(src, true);

  expect(astIsEqual()).toBe.true;
  expect(map.mappings).toBe("EAAC");
});
