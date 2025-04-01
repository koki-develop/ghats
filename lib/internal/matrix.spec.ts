import { describe, expect, test } from "bun:test";
import type { Matrix } from "../package/matrix";
import { matrixJSON } from "./matrix";

describe("matrixJSON", () => {
  test.each<[Matrix, ReturnType<typeof matrixJSON>]>([
    ["${{ foo }}", "${{ foo }}"],
    [
      { foo: "${{ foo }}", bar: "${{ bar }}" },
      { foo: "${{ foo }}", bar: "${{ bar }}" },
    ],
    [
      { foo: [1, 2, 3], bar: [4, "5", true, false, "${{ bar }}"] },
      { foo: [1, 2, 3], bar: [4, "5", true, false, "${{ bar }}"] },
    ],

    [{ include: "${{ foo }}" }, { include: "${{ foo }}" }],
    [
      { include: [{ foo: "${{ foo }}", bar: "${{ bar }}" }] },
      { include: [{ foo: "${{ foo }}", bar: "${{ bar }}" }] },
    ],
    [
      {
        include: [{ foo: [1, 2, 3], bar: [4, "5", true, false, "${{ bar }}"] }],
      },
      {
        include: [{ foo: [1, 2, 3], bar: [4, "5", true, false, "${{ bar }}"] }],
      },
    ],
    [
      {
        exclude: [{ foo: [1, 2, 3], bar: [4, "5", true, false, "${{ bar }}"] }],
      },
      {
        exclude: [{ foo: [1, 2, 3], bar: [4, "5", true, false, "${{ bar }}"] }],
      },
    ],
  ])("matrixJSON(%j) -> %j", (matrix, expected) => {
    expect(matrixJSON(matrix)).toEqual(expected);
  });
});
