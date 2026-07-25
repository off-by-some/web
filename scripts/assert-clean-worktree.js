import { execFileSync } from 'node:child_process';

const gitCommand = '/usr/bin/git';

function git(args) {
  return execFileSync(gitCommand, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

const status = git(['status', '--porcelain=v1']);

if (status) {
  console.error('Cannot deploy with uncommitted working tree changes.');
  console.error('');
  console.error(status);
  console.error('');
  console.error('Commit or stash these changes before running `npm run deploy`.');
  process.exit(1);
}

console.log(`✅ Working tree is clean at ${git(['rev-parse', '--short', 'HEAD'])}`);
