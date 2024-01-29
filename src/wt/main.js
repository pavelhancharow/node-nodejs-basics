import * as os from 'node:os';
import * as path from 'node:path';
import { Worker, isMainThread } from 'node:worker_threads';

const filePath = path.join(path.resolve(), 'src', 'wt', 'worker.js');

const errorData = { status: 'error', data: null };

const performCalculations = async () => {
  if (isMainThread) {
    const numberOfCPUCores = os.availableParallelism();
    const cpuCoresArray = Array.apply(null, new Array(numberOfCPUCores));

    const receivedWorkersResults  = cpuCoresArray.map((_, index) => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(filePath, { workerData: numberOfCPUCores + index });

        worker.on('message', resolve);
        worker.on('error', () => reject(errorData));
        worker.on('exit', (exitCode) => {
          if (exitCode !== 0) reject(errorData);
        });
      });
    });

    const workersResults = await Promise.allSettled(receivedWorkersResults);

    console.info(workersResults.map((item) => item.value || item.reason));
  }
};

await performCalculations();