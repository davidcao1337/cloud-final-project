import * as child_process from 'child_process';
import * as path from 'path';

const getData = async(req, res) => {
    const { hshd_num_selection, sort_selection } = req.params

    // Create file paths
    const __dirnameInitial = path.dirname(new URL(import.meta.url).pathname);
    const __dirname = __dirnameInitial.slice(1);

    const householdFilePath = path.join(__dirname, 'data', '400_households.csv');
    const productsFilePath = path.join(__dirname, 'data', '400_products.csv');
    const transactionsFilePath = path.join(__dirname, 'data', '400_transactions.csv');

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

const getDataCollection = async(req, res) => {

    const __dirnameInitial = path.dirname(new URL(import.meta.url).pathname);
    const __dirname = __dirnameInitial.slice(1);
    const householdFilePath = path.join(__dirname, 'data', '400_households.csv');
    const productsFilePath = path.join(__dirname, 'data', '400_products.csv');
    const transactionsFilePath = path.join(__dirname, 'data', '400_transactions.csv');

    // Execute python script
    const childPython = child_process.spawn('python', [`${__dirname}/base_data.py`, householdFilePath, productsFilePath, transactionsFilePath]);

    // res.status(200).json(childPython)
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

const getHouseholdSpendData = async(req, res) => {

    const __dirnameInitial = path.dirname(new URL(import.meta.url).pathname);
    const __dirname = __dirnameInitial.slice(1);
    const householdFilePath = path.join(__dirname, 'data', '400_households.csv');
    const productsFilePath = path.join(__dirname, 'data', '400_products.csv');
    const transactionsFilePath = path.join(__dirname, 'data', '400_transactions.csv');

    // Execute python script
    const childPython = child_process.spawn('python', [`${__dirname}/dashboard_spend_HH_size.py`, householdFilePath, productsFilePath, transactionsFilePath]);

    // res.status(200).json(childPython)
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

const uploadFile = async(req, res) => {
    const __dirnameInitial = path.dirname(new URL(import.meta.url).pathname);
    const __dirname = __dirnameInitial.slice(1);
    
    res.status(200).json(req.file)
}

const getFiles = async(req, res) => {
    const __dirnameInitial = path.dirname(new URL(import.meta.url).pathname);
    const __dirname = __dirnameInitial.slice(1);
    
    res.status(200).json(__dirname)
}

export { getData , getDataCollection, getHouseholdSpendData, uploadFile, getFiles }