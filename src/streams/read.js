import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { pipeline } from 'node:stream/promises';

const filePath = path.join(path.resolve(), 'src', 'streams', 'files', 'fileToRead.txt');

const read = async () => {
  const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  readStream.on('end', () => {
    process.stdout.write('\n');
  });

  try {
    await pipeline(readStream, process.stdout);
  } catch (error) {
    console.error(error.toString());
    process.exit(1);
  }
};

await read();