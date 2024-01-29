import { parentPort, workerData } from 'node:worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  if (typeof workerData !== 'number' || Number.isNaN(workerData)) {
    throw new Error('WorkerData is NaN');
  }

  parentPort.postMessage({ status: 'resolved', data: nthFibonacci(workerData) });
};

sendResult();