import { describe, expect, test } from "bun:test";
import type { Container } from "../package/container";
import { containerJSON } from "./container";

describe("containerJSON", () => {
  test.each<[Container, ReturnType<typeof containerJSON>]>([
    [{ image: "node:20" }, { image: "node:20" }],
    [
      { image: "node:20", credentials: { username: "foo", password: "bar" } },
      { image: "node:20", credentials: { username: "foo", password: "bar" } },
    ],
    [
      { image: "node:20", env: { FOO: "bar" } },
      { image: "node:20", env: { FOO: "bar" } },
    ],
    [
      { image: "node:20", ports: [3000, "3000:3000"] },
      { image: "node:20", ports: [3000, "3000:3000"] },
    ],
    [
      { image: "node:20", volumes: ["foo:bar"] },
      { image: "node:20", volumes: ["foo:bar"] },
    ],
    [
      { image: "node:20", options: "--cpus 1" },
      { image: "node:20", options: "--cpus 1" },
    ],
    [
      {
        image: "node:20",
        credentials: { username: "foo", password: "bar" },
        env: { FOO: "bar" },
        ports: [3000, "3000:3000"],
        volumes: ["foo:bar"],
        options: "--cpus 1",
      },
      {
        image: "node:20",
        credentials: { username: "foo", password: "bar" },
        env: { FOO: "bar" },
        ports: [3000, "3000:3000"],
        volumes: ["foo:bar"],
        options: "--cpus 1",
      },
    ],
  ])("containerJSON(%j) -> %j", (container, expected) => {
    expect(containerJSON(container)).toEqual(expected);
  });
});
