import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const rootDir = process.cwd();
const buildDir = path.join(rootDir, 'build');
const gitCommand = '/usr/bin/git';

function currentGitSha() {
  return execFileSync(gitCommand, ['rev-parse', 'HEAD'], {
    cwd: rootDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

function resolveBuildSha() {
  const sha = process.env.SOURCE_COMMIT || process.env.GITHUB_SHA || currentGitSha();

  if (!/^[0-9a-f]{40}$/i.test(sha)) {
    throw new Error(`Build SHA must be a full 40-character git commit hash, received: ${sha}`);
  }

  return sha;
}

const sha = resolveBuildSha();
const targets = [path.join(buildDir, 'sha'), path.join(buildDir, 'storybook', 'sha')];

for (const target of targets) {
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, `${sha}\n`);
  console.log(`✅ Wrote ${path.relative(rootDir, target)} (${sha})`);
}
