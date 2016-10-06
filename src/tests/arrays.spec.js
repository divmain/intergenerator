const { generate } = require("./_test-util");

test("ArrayExpression", () => {
  const src = `[thing, null, null]`;
  let { code, map } = generate(src);

  expect(code).toBe("[thing,null,null];");
  expect(map.mappings).toBe("EAAC");
});
