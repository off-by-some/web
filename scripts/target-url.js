/**
 * Resolve a remote target URL from the CLI or environment, so Lighthouse/screenshot
 * scripts can audit a live deployment (e.g. GitHub Pages) instead of building and
 * spinning up a local preview server.
 *
 * Accepts `--url=<value>` or `--url <value>` on the CLI, falling back to the
 * TARGET_URL environment variable. Returns null when no target was provided.
 */
export function getTargetUrl() {
  const args = process.argv.slice(2);

  const inline = args.find((arg) => arg.startsWith('--url='));
  if (inline) return inline.slice('--url='.length);

  const flagIndex = args.indexOf('--url');
  if (flagIndex !== -1 && args[flagIndex + 1]) return args[flagIndex + 1];

  return process.env.TARGET_URL || null;
}
