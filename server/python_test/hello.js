import * as child_process from 'child_process';

var name = 'John';

const childPython = child_process.spawn('python', ['hello_test.py', name]);

childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

childPython.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});