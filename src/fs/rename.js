import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { currentWorkingDirPath, prettyConsole } from './utils.js';

const sourceFilePath = path.join(currentWorkingDirPath, 'src', 'fs', 'files', 'wrongFilename.txt');
const targetFilePath = path.join(currentWorkingDirPath, 'src', 'fs', 'files', 'properFilename.md');

const renameFile = async (sourcePath, targetPath) => {
  try {
    await fs.rename(sourcePath, targetPath);

    prettyConsole.info();
  } catch (error) {
    prettyConsole.error(error.toString());
  }
}

const rename = async () => {
  try {
    await fs.access(sourceFilePath, fs.constants.F_OK);
    await fs.access(targetFilePath, fs.constants.F_OK);

    throw new Error(`'${targetFilePath}' file already exists`);
  } catch (error) {
    if (error && error.code === 'ENOENT' && error.syscall === 'access') {
      await renameFile(sourceFilePath, targetFilePath);
      return;
    }

    prettyConsole.error(error.toString());
  }
};

await rename();