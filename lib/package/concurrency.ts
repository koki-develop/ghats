export type Concurrency =
  | string
  | {
      group: string;
      cancelInProgress?: boolean;
    };

export function concurrencyJSON(
  concurrency: Concurrency,
): string | Record<string, unknown> {
  if (typeof concurrency === "string") {
    return concurrency;
  }

  return {
    group: concurrency.group,
    ...(concurrency.cancelInProgress != null && {
      "cancel-in-progress": concurrency.cancelInProgress,
    }),
  };
}
