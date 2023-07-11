/**
 * @author baoyuhao
 * @date 2023/7/11 18:01:32
 * @description 测试组件引入
 * @version 0.1.0
 */
describe("import vue components", () => {
  test("normal imports as expected", async () => {
    const cmp = await import("../src/pages/result/success/index.vue");
    expect(cmp).toBeDefined();
  });

  test("template string imports as expected", async () => {
    // eslint-disable-next-line @typescript-eslint/quotes
    const cmp = await import(`../src/pages/result/success/index.vue`);
    expect(cmp).toBeDefined();
  });

  test("dynamic imports as expected", async () => {
    const name = "index";
    const cmp = await import(`../src/pages/result/success/${name}.vue`);
    expect(cmp).toBeDefined();
  });
});