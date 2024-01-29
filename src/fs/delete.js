import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { currentWorkingDirPath, prettyConsole } from './utils.js';

const filePath = path.join(currentWorkingDirPath, 'src', 'fs', 'files', 'fileToRemove.txt');

const remove = async () => {
  try {
    await fs.access(filePath, fs.constants.F_OK);

    await fs.unlink(filePath);
    prettyConsole.info();
  } catch (error) {
    prettyConsole.error(error.toString());
  }
};

await remove();