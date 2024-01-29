import * as process from 'node:process';

const parseEnv = () => {
  const prefix = 'RSS_';
  const envData = process.env;

  const results = [];

  for (const [envKey, envValue] of Object.entries(envData)) {
    if(envKey.startsWith(prefix)){
      results.push(`${envKey}=${envValue}`);
    }
  }

  console.info(results.join('; ') || 'Not found');
};

parseEnv();