import * as fs from 'node:fs'
import * as crypto from 'node:crypto';
import * as path from 'node:path';
import * as process from 'node:process';
import { pipeline } from 'node:stream/promises';

const filePath = path.join(path.resolve(), 'src', 'hash', 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  const hash = crypto.createHash('sha256', { encoding: 'hex' });
  const readStream = fs.createReadStream(filePath);

  hash.on('end', () => {
    process.stdout.write('\n');
  });

  try {
    await pipeline(readStream, hash, process.stdout);
  } catch (error) {
    console.error(error.toString());
  }
};

await calculateHash();