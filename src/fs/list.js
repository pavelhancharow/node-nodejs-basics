import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { currentWorkingDirPath, prettyConsole } from './utils.js';

const folderPath = path.join(currentWorkingDirPath, 'src', 'fs', 'files');

const list = async () => {
  try {
    await fs.access(folderPath, fs.constants.F_OK);

    const folderList = await fs.readdir(folderPath, { withFileTypes: false });
    prettyConsole.info('\n', folderList);
  } catch (error) {
    prettyConsole.error(error.toString());
  }
};

await list();