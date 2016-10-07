const { generate, dedent } = require("./_test-util");

test("ReturnStatement", () => {
  const src = "return a;";

  let { code, map } = generate(src);

  expect(code).toBe("return a;");
  expect(map.mappings).toBe("QAAO");
});
