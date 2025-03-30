export type Concurrency =
  | string
  | {
      group: string;
      cancelInProgress?: boolean;
    };

export function concurrencyJSON(
  concurrency?: Concurrency,
): string | Record<string, unknown> | undefined {
  if (concurrency == null) return undefined;

  if (typeof concurrency === "string") {
    return concurrency;
  }

  return {
    group: concurrency.group,
    "cancel-in-progress": concurrency.cancelInProgress,
  };
}
