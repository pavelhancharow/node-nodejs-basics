import * as process from 'node:process';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const invertString = (str) => {
  let invertedString = '';

  for (let i = str.length - 1; i >= 0; i--) {
    invertedString += str[i];
  }

  return invertedString;
};

const transform = async () => {
  const transformInput = new Transform({
    transform(chunk, encoding, callback) {
      let str = chunk.toString();
      str = str.endsWith('\n') ? str.replace('\n', '') : str + '\n';

      callback(null, invertString(str) + '\n\n');
    }
  });

  try {
    await pipeline(process.stdin, transformInput, process.stdout);
  } catch (error) {
    console.error(error.toString());
    process.exit(1);
  }
};

await transform();