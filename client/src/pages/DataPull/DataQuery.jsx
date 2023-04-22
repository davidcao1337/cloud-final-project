import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DataPullTable from './Table';
import './datapull.css';

const BASE_URL = 'http://localhost:1337'
const regex = /\[.*?\]/s;

const QueryData = ( props ) => {

    const householdNum = props.household
    const sortType = props.sortType
    const [revealTable, setTableReveal] = useState(false);
    const [parsedJson, setParsedJson ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch (`${BASE_URL}/api/data/${householdNum}/${sortType}`)
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

        fetchData();
    }, [householdNum, sortType])

    const getHeadings = () => {
        return Object.keys(parsedJson[0]);
    }
        

    return (
        <div className='tableContainer w-full h-full'>
            { revealTable &&
                <DataPullTable theadData={getHeadings()} tbodyData={parsedJson}/>
            }
            { !revealTable &&
                <div>Loading....</div>
            }
        </div>
    );
}

export default QueryData