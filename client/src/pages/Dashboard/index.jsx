import './dashboard.css';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import HouseHoldSpendBarChart from './HouseHoldSpendBarChart';
import DepartmentAgeBarChart from './departmentByDemo';
import { Bar } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BASE_URL = 'https://cloud-deploy-test-384518.uk.r.appspot.com'
const regex = /\[.*?\]/s;

const Dashboard = () => {
    
    const [firstTime, setFirstTime] = useState(false);
    // Do households spend less or more?
    // query for sales by household size
    const [doneProcessing, setProcessingFlag] = useState(false);



    const ageLabels = ['19-24','25-34','35-44','45-54','55-64','65-74','75+']

    const data = {
        labels: ["GIFT", "MEAT-POULTRY", "BAKERY", "MEAT_TURKEY", "COSMETICS", "CANNEDGOODS", "PRODUCE", "DRYGOODS", "FROZENFOOD", "SPECIALTYFOOD", "GROCERYSTAPLE", "PET", "TOYS", "AUTO", "MEAT_CHICKEN", "MEDICALSUPPLIES", "DIARY", "SEAFOOD", "MEDICATION", "BEVERAGE-NONWATER"],
        datasets: [
            {
              label: '19-24',
              data: [65,5,552,40,17,131,1471,227,1071,46,2933,46,12,2,132,3,749,150,137,405],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: '25-34',
              data: [269,21,3754,229,87,131,1471,227,1071,46,2933,46,12,2,132,3,749,150,137,405],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: '35-44',
              data: [629, 86, 6996, 450, 193, 3763, 18659, 4085, 10804, 608, 42484, 1239, 324, 44, 1880, 32, 13501, 829, 1686, 9203],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: '45-54',
              data: [1083, 90, 10453, 700, 464, 4540, 25664, 5447, 11379, 645, 52675, 2351, 209, 88, 3129, 16, 17909, 1036, 1763, 10849],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: '55-64',
              data: [925, 53, 9526, 382, 292, 4504, 21550, 4994, 11602, 377, 47833, 3094, 108, 101, 2715, 48, 15589, 1228, 1722, 10562],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: '65-74',
              data: [651, 49, 5730, 262, 173, 3417, 15211, 2512, 8275, 310, 27074, 3927, 38, 32, 1472, 47, 9651, 651, 1264, 5542],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: '75+',
              data: [237, 32, 4648, 121, 54, 2189, 9323, 1583, 4904, 140, 16872, 2067, 23, 19, 977, 14, 6017, 401, 894, 3942],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
      
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: top
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
    };

    const barChartLabels = ['1', '2', '3', '4', '5+']
    const barChartStats = [194277, 251211, 158370, 86523, 111304]

    const departmentLabels = ["GIFT", "MEAT-POULTRY", "BAKERY", "MEAT_TURKEY", "COSMETICS", "CANNEDGOODS", "PRODUCE", "DRYGOODS", "FROZENFOOD", "SPECIALTYFOOD", "GROCERYSTAPLE", "PET", "TOYS", "AUTO", "MEAT_CHICKEN", "MEDICALSUPPLIES", "DIARY", "SEAFOOD", "MEDICATION", "BEVERAGE-NONWATER"]
    const departmentStats = [
        [65,5,552,40,17,131,1471,227,1071,46,2933,46,12,2,132,3,749,150,137,405],
        [269,21,3754,229,87,131,1471,227,1071,46,2933,46,12,2,132,3,749,150,137,405],
        [629, 86, 6996, 450, 193, 3763, 18659, 4085, 10804, 608, 42484, 1239, 324, 44, 1880, 32, 13501, 829, 1686, 9203],
        [1083, 90, 10453, 700, 464, 4540, 25664, 5447, 11379, 645, 52675, 2351, 209, 88, 3129, 16, 17909, 1036, 1763, 10849],
        [925, 53, 9526, 382, 292, 4504, 21550, 4994, 11602, 377, 47833, 3094, 108, 101, 2715, 48, 15589, 1228, 1722, 10562],
        [651, 49, 5730, 262, 173, 3417, 15211, 2512, 8275, 310, 27074, 3927, 38, 32, 1472, 47, 9651, 651, 1264, 5542],
        [237, 32, 4648, 121, 54, 2189, 9323, 1583, 4904, 140, 16872, 2067, 23, 19, 977, 14, 6017, 401, 894, 3942]
    ]
    // What categories are growing or shrinking with changing customer engagement?
    // query for department by age range

    return (
        <div className='contentContainer grow flex flex-col'>
            <h1 className="Title mt-5 mb-5 ml-5 font-bold text-3xl text-[#525252]">Dashboard</h1>
            <div className='graphsContainer flex flex-row'>
                <div className='barChartContainer'>
                    <HouseHoldSpendBarChart chartLabels = {barChartLabels} barChartStats = {barChartStats}/>
                    <div className='description'>This shows the total spent between household size in 2020</div>
                </div>
                <div className='barChartContainer'>
                    <DepartmentAgeBarChart chartLabels = {departmentLabels} barChartStats = {departmentStats}/>
                    <div className='description'>This shows the age dmeographic between departments over time</div>
                </div>
            </div>
            <div>
                Do households spend less or more?: In the year 2020 it looked like higher households spent less over time
            </div>
            <div>
                What categories are growing or shrinking with changing customer engagement? Toys and gifts
            </div>
            <div>
                How do they affect customer engagement with certain categories?: People with babies are getting more kid stuff, elderly people are spending more on medicine
            </div>
            <div>
                How might we re-engage customers within the store? Or within a specific category?: Remarket dying categories to entice people to want to get these items? Like toys for parents
            </div>
            <div className='graphsContainer grow flex flex-row'></div>
        </div>
    )
}

export default Dashboard