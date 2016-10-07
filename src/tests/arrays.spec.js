const { generate } = require("./_test-util");

test("ArrayExpression", () => {
  const src = `[thing,null,null]`;

  let { map, astIsEqual } = generate(src, true);

  expect(astIsEqual()).toBeTruthy();
  expect(map.mappings).toBe("EAAC");
});
