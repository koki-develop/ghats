export function toUpperCamelCase(str: string): string {
  return str
    .split(/[-_\/]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function removeUndefinedKeys<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as Partial<T>;
}
