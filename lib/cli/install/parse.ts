export type ParsedAction = {
  fullName: string;
  owner: string;
  repo: string;
  action: string | null;
  version: string | null;
};

export function parseAction(arg: string): ParsedAction {
  const [action, version] = arg.split("@");
  if (!action) throw new Error(`Invalid action: ${arg}`);

  const [owner, repo, ...rest] = action.split("/");
  if (!owner || !repo) throw new Error(`Invalid action: ${arg}`);

  return {
    fullName: action,
    owner,
    repo,
    action: rest.length > 0 ? rest.join("/") : null,
    version: version ?? null,
  };
}
