import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';
import { pipeline } from 'node:stream/promises';

const filePath = path.join(path.resolve(), 'src', 'streams', 'files', 'fileToWrite.txt');

const write = async () => {
  try {
    await fs.promises.access(filePath, fs.constants.W_OK);
  } catch (error) {
    console.error(error.toString());
    return;
  }

  const writeStream = fs.createWriteStream(filePath, { flags: 'w' });

  try {
    await pipeline(process.stdin, writeStream);
  } catch (error) {
    console.error(error.toString());
    process.exit(1);
  }
};

await write();