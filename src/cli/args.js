import * as process from 'node:process';

const parseArgs = () => {
  const argsData = process.argv.slice(2);
  const result = [];

  for (let i = 0; i < argsData.length; i += 2) {
    const key = argsData[i].replace('--', '');
    const value = argsData[i + 1];

    result.push(`${key} is ${value}`);
  }

  console.info(result.join(', ') || 'Not found');
};

parseArgs();