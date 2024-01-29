import * as path from 'node:path';
import * as process from 'node:process';
import { spawn } from 'node:child_process';

const filePath = path.join(path.resolve(), 'src', 'cp', 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const childProcess = await spawn('node', [filePath, ...args], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });

  childProcess.stdout.pipe(process.stdout);
  process.stdin.pipe(childProcess.stdin);

  childProcess.on('exit', (code) => {
    process.exit(code);
  });

  childProcess.on('error', (error) => {
    console.error(error.toString());
    process.exit(1);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([...process.argv]);
