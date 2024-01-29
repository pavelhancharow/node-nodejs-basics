import * as fs from 'node:fs';
import * as path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createUnzip } from 'node:zlib';

const sourceFilePath = path.join(path.resolve(), 'src', 'zip', 'files', 'archive.gz');
const targetFilePath = path.join(path.resolve(), 'src', 'zip', 'files', 'fileToCompress.txt');

const decompress = async () => {
  const unzip = createUnzip();
  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(targetFilePath);

  try {
    await pipeline(readStream, unzip, writeStream);
    await fs.promises.unlink(sourceFilePath);
  } catch (error) {
    console.error(error.toString());
  }
};

await decompress();