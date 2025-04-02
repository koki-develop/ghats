import type { RunsOn } from "../package/runs-on";

export function runsOnJSON(
  runsOn: RunsOn,
): string | string[] | Record<string, unknown> {
  if (typeof runsOn === "string") return runsOn;
  if (Array.isArray(runsOn)) return runsOn;

  return {
    group: runsOn.group,
    ...(runsOn.labels != null && { labels: runsOn.labels }),
  };
}
