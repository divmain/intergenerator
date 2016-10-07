const { generate, dedent } = require("./_test-util");

test("FunctionDeclaration", () => {
  const src = `function myFunc(a,b,c){a;}`;

  let { code, map, astIsEqual } = generate(src);

  expect(astIsEqual()).toBeTruthy();
  expect(map.mappings).toBe("UAAS,OAAO,EAAE,EAAE,GAAG");
});
