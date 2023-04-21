import * as child_process from 'child_process';
import * as path from 'path';

const getData = async(req, res) => {
    const { hshd_num_selection, sort_selection } = req.params

    // Create file paths
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const householdFilePath = path.join(__dirname, 'data', '400_households.csv');
    const productsFilePath = path.join(__dirname, 'data', '400_products.csv');
    const transactionsFilePath = path.join(__dirname, 'data', '400_transactions.csv');

    // Execute python script
    const childPython = child_process.spawn('python', [`${__dirname}/data_analyze.py`, householdFilePath, productsFilePath, transactionsFilePath, hshd_num_selection, sort_selection]);

    let data = '';

    // Post python script execution
    childPython.stdout.on('data', (chunk) => {
        data += chunk;
    });

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
            // data is a JSON string
            res.status(200).json(data)
        } else {
            res.status(500).json(data)
        }
    });
}

export { getData }