import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { currentWorkingDirPath, prettyConsole } from './utils.js';

const filePath = path.join(currentWorkingDirPath, 'src', 'fs', 'files', 'fileToRead.txt');

const read = async () => {
  try {
    await fs.access(filePath, fs.constants.F_OK);

    const fileData = await fs.readFile(filePath, { encoding: 'utf8' });
    prettyConsole.info('\n', fileData);
  } catch (error) {
    prettyConsole.error(error.toString());
  }
};

await read();