const { generate } = require("./_test-util");

test("FunctionDeclaration", () => {
  const src = "function myFunc(a,b,c){a;}";

  const { map, assertAstIsEqual } = generate(src);

  assertAstIsEqual();
  expect(map.mappings).toBe("UAAS,OAAO,EAAE,EAAE,GAAG");
});
