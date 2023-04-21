import React, { useEffect } from 'react';
import './datapull.css';

const BASE_URL = 'http://localhost:1337'
const regex = /\[.*?\]/s;

const DataPull = () => {
    /* Test
    const hshd_num_selection = "10"
    const sort_selection = "BASKET_NUM"

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch (`${BASE_URL}/api/data/${hshd_num_selection}/${sort_selection}`)
            const json = await response.json()

            if(response.ok) {
                // Regex to remove LOG messages from JSON
                const jsonArr = json.match(regex)[0];
                console.log(jsonArr)
            }

            if(!response.ok) {
                console.log("Error")
            }
        }

        fetchData();
    }, [hshd_num_selection, sort_selection])
    */

    return (
        <div>
            <h1 className="Title mt-5 mb-5 ml-5 font-bold text-3xl text-[#525252]">Data Pull</h1>
        </div>
    )
}

export default DataPull