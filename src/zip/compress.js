import * as path from 'node:path';
import * as fs from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const sourceFilePath = path.join(path.resolve(), 'src', 'zip', 'files', 'fileToCompress.txt');
const targetFilePath = path.join(path.resolve(), 'src', 'zip', 'files', 'archive.gz');

const compress = async () => {
  const gzip = createGzip();
  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(targetFilePath);

  try {
    await pipeline(readStream, gzip, writeStream);
    await fs.promises.unlink(sourceFilePath);
  } catch (error) {
    console.error(error.toString());
  }
};

await compress();