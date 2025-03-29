import { describe, expect, test } from "bun:test";
import { toUpperCamelCase } from "./util";

describe("toUpperCamelCase", () => {
  test.each([
    ["foo/bar", "FooBar"],
    ["foo/bar/baz", "FooBarBaz"],
    ["foo/bar/baz/qux", "FooBarBazQux"],

    ["foo//bar", "FooBar"],
    ["foo//bar//baz", "FooBarBaz"],
    ["foo//bar//baz//qux", "FooBarBazQux"],

    ["foo-bar", "FooBar"],
    ["foo-bar-baz", "FooBarBaz"],
    ["foo-bar-baz-qux", "FooBarBazQux"],

    ["foo--bar", "FooBar"],
    ["foo--bar--baz", "FooBarBaz"],
    ["foo--bar--baz--qux", "FooBarBazQux"],

    ["foo_bar", "FooBar"],
    ["foo_bar_baz", "FooBarBaz"],
    ["foo_bar_baz_qux", "FooBarBazQux"],

    ["foo__bar", "FooBar"],
    ["foo__bar__baz", "FooBarBaz"],
    ["foo__bar__baz__qux", "FooBarBazQux"],
  ])("converts %s to %s", (input, expected) => {
    expect(toUpperCamelCase(input)).toBe(expected);
  });
});
