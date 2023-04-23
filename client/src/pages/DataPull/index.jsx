import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import QueryData from './DataQuery';
import DataPullTable from './Table';
import './datapull.css';

const BASE_URL = 'https://cloud-backend-sqiw.onrender.com'
const regex = /\[.*?\]/s;

const DataPull = () => {
    
    const [household, setHousehold] = useState('');
    const [sortType, setSortType] = useState('');
    const [tableFlag, setTableFlag] = useState(false);

    const handleSortSelect = (selectedOption) => {
        setSortType(selectedOption.value)
    }

    const sortCategories = [
        { value: "Hshd_num", label: "Household Number" },
        { value: "Basket_num", label: "Basket Number" },
        { value: "PURCHASE_DATE", label: "Purchase Date" },
        { value: "Product_num", label: "Product Number" },
        { value: "Department", label: "Department" },
        { value: "Commodity", label: "Commodity" }
    ]

    const handleSubmit = () => {
        if( household === '' || household === 0 || sortType === '' ){
            alert('All Criteria Must Be Filled Out')
        }
        else{
            setTableFlag(true);
        }
    }

    const handleReset = () => {
        setHousehold('')
        setSortType('')
        setTableFlag(false);
    }

    const fetchData = async () => {
        const response = await fetch (`${BASE_URL}/api/data/sarah`)
        const json = await response.json()

        if(response.ok) {
            // // Regex to remove LOG messages from JSON
            let jsonArr = json.match(regex)[0];
            jsonArr = jsonArr.replace(/(^"|"$)/g, '')
            let jsonParse = JSON.parse(jsonArr)
            console.log(jsonParse)
            setParsedJson(jsonParse)
            setTableReveal(true);
        }

        if(!response.ok) {
            console.log("Error")
        }
    }

    // fetchData()

  return (
    <div className='contentContainer grow flex flex-col'>
        <h1 className="Title mt-5 mb-5 ml-5 font-bold text-3xl text-[#525252] text-center">Data Pull</h1>
        <h2 className='text-center'>To begin your data pull please input a household number and your sort criteria</h2>
        <div className='flex justify-center flex-row'>
            <div className="householdSearch-container text-left text-[#828282] flex flex-col"> 
                <label className="font-semibold" htlmfor="household">Household #</label>
                <input className="border-2 w-32 h-14 rounded-[5px] px-2 py-2" value={household} onChange={(e) => setHousehold(e.target.value)} type="number" id="household" name="household" />
            </div>
            <div className="householdSearch-container text-left text-[#828282] flex flex-col">
                <label htlmfor="sortCriteria" className="font-semibold">Select Sort Type</label>
                <Select 
                    className="border-2 w-32 h-14 rounded-[5px] px-2 py-2 "
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#18B283'
                        }
                    })}
                    id="sortCategories" 
                    options={sortCategories} 
                    onChange={handleSortSelect} 
                />
            </div>
        </div>
        { !tableFlag &&
            <button className="btn btn-ghost normal-case text-xl" onClick={handleSubmit}>Submit</button>
        }
        { tableFlag &&
            <button className="btn btn-ghost normal-case text-xl" onClick={handleReset}>Reset</button>
        }
        <div className='datapull-container grow'>
            { tableFlag &&
                <QueryData household={household} sortType={sortType} />
            }
        </div>
    </div>
  );
}

export default DataPull