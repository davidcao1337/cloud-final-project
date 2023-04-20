import React, {useState} from 'react';
import FileModal from './AddFileModal';
import './dataupload.css';

const DataUpload = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Toggle add file modal visibility
    const toggleAddFiles = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <div>
            <h1 className="Title mt-5 mb-5 ml-5 font-bold text-3xl text-[#525252] text-center">Data Pull</h1>
            <h2 className='text-center'>Upload households, products, and transactions</h2>
            <button className = "h-20 w-20 bg-slate-200 rounded-2xl mr-auto" onClick={toggleAddFiles}>File Upload</button>
            {isModalOpen &&
                <FileModal 
                    isOpen={isModalOpen}
                    toggleModalVisibility={toggleAddFiles}
                />
            }
        </div>
    )
}

export default DataUpload