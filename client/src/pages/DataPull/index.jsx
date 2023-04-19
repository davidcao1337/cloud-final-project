import React, {useState} from 'react';
import FileModal from './AddFileModal';
import './datapull.css';

const DataPull= () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    // Toggle add file modal visibility
    const toggleAddFiles = () => {
        setIsModalOpen(!isModalOpen)
    }
    
    return (
        <div>
            <h1 className="Title mt-5 mb-5 ml-5 font-bold text-3xl text-[#525252]">Data Pull</h1>
            <h2>Upload households, products, and transactions</h2>
            <button className = "h-20 w-20 bg-slate-200 rounded-2xl" onClick={toggleAddFiles}>File Upload</button>
            {isModalOpen &&
                <FileModal 
                    isOpen={isModalOpen}
                    toggleModalVisibility={toggleAddFiles}
                />
            }
        </div>
    )
}

export default DataPull