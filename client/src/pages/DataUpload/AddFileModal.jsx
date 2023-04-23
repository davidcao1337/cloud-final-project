import React, {useState} from 'react';
import './dataupload.css';
import axios, { Axios } from 'axios'

const BASE_URL = 'https://cloud-deploy-test-384518.uk.r.appspot.com'

const FileModal= ( props ) => {

    const { isOpen, toggleModalVisibility } = props

    const [selectedProductsFile, setSelectedProductsFile] = useState();
    const [selectedHouseholdsFile, setSelectedHouseholdsFile] = useState();
    const [selectedTransactionsFile, setTransactionsFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeProductsHandler = (event) => {
		setSelectedProductsFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const changeHouseholdsHandler = (event) => {
		setSelectedHouseholdsFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const changeTransactionsHandler = (event) => {
		setTransactionsFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert("Your files have been uploaded!")
        // let data = new FormData();
        // data.append( 'file', selectedHouseholdsFile );
        // console.log(selectedHouseholdsFile)

       
        
        // const response = await fetch('/api/dataupload', {
        //     method: 'POST',
        //     body: new FormData(setSelectedHouseholdsFile)
        // });
        // const json = await response.json()
        // console.log(json)
	};

    return (
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col">
                <h2 className="mt-3 font-bold text-2xl">Add Files Item</h2>
                <h3>Products</h3>
                <input type="file" name="products" onChange={changeProductsHandler} />
                <h3>Households</h3>
                <input
                    type="file"
                    id="household"
                    accept=".csv"
                    onChange={changeHouseholdsHandler}
                />
                {/* <input type="file" name="households" onChange={changeHouseholdsHandler} /> */}
                <h3>Transactions</h3>
                <input type="file" name="transactions" onChange={changeTransactionsHandler} />
                <div className="buttons-container flex flex-row">
                    <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={handleSubmit}>Add Files</button>
                    <button className="ml-10 btn" onClick={toggleModalVisibility}>Cancel</button>
                </div>
                {/* {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>} */}
            </div>
        </div>
    )
}

export default FileModal
