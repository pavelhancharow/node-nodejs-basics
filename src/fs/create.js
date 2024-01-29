import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { prettyConsole, currentWorkingDirPath } from './utils.js';

const filePath = path.join(currentWorkingDirPath, 'src', 'fs', 'files', 'fresh.txt');

const writeFile = async (content, targetPath) => {
  try {
    await fs.writeFile(targetPath, content);

    prettyConsole.info();
  } catch (error) {
    prettyConsole.error(error.toString());
  }
};

const create = async () => {
  const content = 'I am fresh and young';

  try {
    await fs.access(filePath, fs.constants.F_OK);

    throw new Error(`'${filePath}' file already exists`);
  } catch (error) {
    if (error && error.code === 'ENOENT' && error.syscall === 'access') {
      await writeFile(content, filePath);
      return;
    }

    prettyConsole.error(error.toString());
  }
};

await create();