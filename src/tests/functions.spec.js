const { generate, dedent } = require("./_test-util");

test("FunctionDeclaration", () => {
  const src = `function myFunc(a,b,c){a;}`;

  let { code, map, assertAstIsEqual } = generate(src);

  assertAstIsEqual();
  expect(map.mappings).toBe("UAAS,OAAO,EAAE,EAAE,GAAG");
});
