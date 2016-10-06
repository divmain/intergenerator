const { generate, dedent } = require("./_test-util");

test("ReturnStatement", () => {
  const src = dedent(4, `
    function myFunc (a, b, c) {
      return a;
    }
  `);

  let { code, map } = generate(src);

  expect(code).toBe("function myFunc(a,b,c){return a;}");
  expect(map.mappings).toBe("UAAS,OAAQ,EAAG,EAAG,UACd");
});
