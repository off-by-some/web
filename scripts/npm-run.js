import { spawnSync } from 'child_process';

/**
 * Resolve how to invoke npm from within a script, preferring the exact
 * executable that launched the current process over a bare "npm" lookup on PATH.
 */
function resolveNpmCommand() {
  const npmExecPath = process.env.npm_execpath;

  if (npmExecPath?.endsWith('.js')) {
    return { command: process.execPath, prefixArgs: [npmExecPath] };
  }

  return { command: npmExecPath || 'npm', prefixArgs: [] };
}

/**
 * Run an `npm <args>` command, inheriting stdio, and exit the current
 * process if it fails.
 */
export function runNpm(args) {
  const { command, prefixArgs } = resolveNpmCommand();
  const result = spawnSync(command, [...prefixArgs, ...args], {
    stdio: 'inherit',
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
