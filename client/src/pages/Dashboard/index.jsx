import './dashboard.css';
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BASE_URL = 'http://localhost:1337'
const regex = /\[.*?\]/s;

const Dashboard = () => {
    
    const [firstTime, setFirstTime] = useState(false);
    // Do households spend less or more?
    // query for sales by household size
    const [parsedHouseholdSpend, setHouseholdSpendJson ] = useState(null);
    const [revealTable, setTableReveal] = useState(false);
    const [doneProcessing, setProcessingFlag] = useState(false);
    const [barChartData, setBarChartData] = useState(null);

    const barChartLabels = [];
    const barChartStats = [];

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
            setHouseholdSpendJson(jsonParse);
            setTableReveal(true);
        }

        if(!response.ok) {
            console.log("Error")
        }

    }

    if( !firstTime ){
        fetchHouseholdSpendData();
    }

    if( revealTable && !doneProcessing ){
        for( let i = 0; i < parsedHouseholdSpend.length; i++){
            barChartLabels.push(parsedHouseholdSpend[i].HH_SIZE)
            barChartStats.push(parsedHouseholdSpend[i].HOUSEHOLD_DEMOGRAPHIC_SPENT)
        }

        let inputDatasets = {
            label: 'Total Spent By Household Size',
            data: barChartStats,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }

        let data = {
            labels: barChartLabels,
            datasets: [ inputDatasets ]
        }
        setBarChartData(data);
        setProcessingFlag(true);
        console.log(barChartData)
    }
    
    // What categories are growing or shrinking with changing customer engagement?
    // query for department by age range

    return (
        <div className='contentContainer grow flex flex-col'>
            <h1 className="Title mt-5 mb-5 ml-5 font-bold text-3xl text-[#525252]">Dashboard</h1>
            <div className='graphsContainer flex flex-row'>
                { doneProcessing &&
                    <div className='chartContainer flex flex-col'>
                        {/* <div className='barChartContainer'> */}
                            <Bar
                                data={barChartData}
                                options={{
                                    responsive: true,
                                }}
                            />
                        {/* </div> */}
                        <div>Total Spent by Household Size in 2020</div>
                    </div>
                }
                <div className='householdSpent'>This will show how much a household has spent</div>
                <div className='householdSpent'>This will show how much a department gets by customer age</div>
            </div>
            <div className='graphsContainer grow flex flex-row'></div>
        </div>
    )
}

export default Dashboard