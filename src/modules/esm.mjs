import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import { fileURLToPath } from 'node:url';
import './files/c.js';

const random = Math.random();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let unknownObject = random > 0.5
    ? await fs.readFile(path.join(__dirname, 'files', 'a.json'))
    : await fs.readFile(path.join(__dirname, 'files', 'b.json'));

unknownObject = JSON.parse(unknownObject);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};

