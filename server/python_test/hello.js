import * as child_process from 'child_process';
import * as path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, 'data', '400_households.csv');

const childPython = child_process.spawn('python', ['hello_test.py', filePath]);

childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

childPython.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});