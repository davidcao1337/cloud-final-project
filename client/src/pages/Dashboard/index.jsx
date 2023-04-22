import './dashboard.css';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import HouseHoldSpendBarChart from './HouseHoldSpendBarChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BASE_URL = 'http://localhost:1337'
const regex = /\[.*?\]/s;

const Dashboard = () => {
    
    const [firstTime, setFirstTime] = useState(false);
    // Do households spend less or more?
    // query for sales by household size
    const [doneProcessing, setProcessingFlag] = useState(false);
    const [barChartLabels, setBarChartLabels] = useState(null);
    const [barChartStats, setBarChartStats] = useState(null);

    const fetchHouseholdSpendData = async () => {
        setFirstTime(true);
        const response = await fetch (`${BASE_URL}/api/data/householdSpend`)
        const json = await response.json()

        if(response.ok) {
            // // Regex to remove LOG messages from JSON
            let jsonArr = json.match(regex)[0];
            jsonArr = jsonArr.replace(/(^"|"$)/g, '')
            let jsonParse = JSON.parse(jsonArr)
            console.log(jsonParse)
            let labels = []
            let stats = []
            for( let i = 0; i < jsonParse.length; i++){
                labels.push(jsonParse[i].HH_SIZE)
                stats.push(jsonParse[i].HOUSEHOLD_DEMOGRAPHIC_SPENT)
            }
            setBarChartLabels(labels);
            setBarChartStats(stats);
            setProcessingFlag(true);
        }

        if(!response.ok) {
            console.log("Error")
        }

    }

    if( !firstTime ){
        fetchHouseholdSpendData();
    }
    
    // What categories are growing or shrinking with changing customer engagement?
    // query for department by age range

    return (
        <div className='contentContainer grow flex flex-col'>
            <h1 className="Title mt-5 mb-5 ml-5 font-bold text-3xl text-[#525252]">Dashboard</h1>
            <div className='graphsContainer flex flex-row'>
                { doneProcessing &&
                    <div className='barChartContainer'>
                        <HouseHoldSpendBarChart chartLabels = {barChartLabels} barChartStats = {barChartStats}/>
                        <div className='description'>This shows the total spent between household size in 2020</div>
                    </div>
                }
                { !doneProcessing &&
                    <div>Loading...</div>
                }
            </div>
            <div className='graphsContainer grow flex flex-row'></div>
        </div>
    )
}

export default Dashboard