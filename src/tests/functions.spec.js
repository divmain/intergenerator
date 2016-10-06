const { generate, dedent } = require("./_test-util");

test("FunctionDeclaration", () => {
  const src = dedent(4, `
    function myFunc (a, b, c) {
      a;
    }
  `);

  let { code, map } = generate(src);

  expect(code).toBe("function myFunc(a,b,c){a;}");
  expect(map.mappings).toBe("UAAS,OAAQ,EAAG,EAAG,GACrB");
});
