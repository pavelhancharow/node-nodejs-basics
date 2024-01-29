import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { currentWorkingDirPath, prettyConsole } from './utils.js';

const sourceFolderPath = path.join(currentWorkingDirPath, 'src', 'fs', 'files');
const targetFolderPath = path.join(currentWorkingDirPath, 'src', 'fs', 'files_copy');

const copyFolder = async (sourcePath, targetPath) => {
  try {
    await fs.cp(sourcePath, targetPath, { recursive: true });

    prettyConsole.info();
  } catch (error) {
    prettyConsole.error(error.toString());
  }
};

const copy = async () => {
  try {
    await fs.access(sourceFolderPath, fs.constants.F_OK);
    await fs.access(targetFolderPath, fs.constants.F_OK);

    throw new Error(`'${targetFolderPath}' folder has already been created`);
  } catch (error) {
    if (error && error.code === 'ENOENT' && error.syscall === 'access') {
      await copyFolder(sourceFolderPath, targetFolderPath);
      return;
    }

    prettyConsole.error(error.toString());
  }
};

await copy();
