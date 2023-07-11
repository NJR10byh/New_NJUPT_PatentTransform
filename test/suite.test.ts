/**
 * @author baoyuhao
 * @date 2023/7/11 16:45:59
 * @description
 * @version 0.1.0
 */
import { assert, describe, expect, it } from "vitest";

describe("suite name", () => {
  it("foo", () => {
    assert.equal(Math.sqrt(4), 2);
  });

  it("bar", () => {
    expect(1 + 1).eq(2);
  });

  it("snapshot", () => {
    expect({ foo: "bar" }).toMatchSnapshot();
  });
});
