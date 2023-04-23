import './dashboard.css';
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentAgeBarChart = ( props ) => {
    
    console.log(props)
    const chartLabels = props.chartLabels
    const chartStats = [237, 32, 4648, 121, 54, 2189, 9323, 1583, 4904, 140, 16872, 2067, 23, 19, 977, 14, 6017, 401, 894, 3942]

    let inputDatasets = {
        label: '19-24',
        data: chartStats,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
            'rgb(255, 99, 132)'
        ],
        borderWidth: 1
    }

    let inputDatasets2 = {
        label: '25-34',
        data: [269,21,3754,229,87,131,1471,227,1071,46,2933,46,12,2,132,3,749,150,137,405],
        backgroundColor: [
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgb(255, 159, 64)'
        ],
        borderWidth: 1
    }

    let inputDatasets3 = {
        label: '35-44',
        data: [629, 86, 6996, 450, 193, 3763, 18659, 4085, 10804, 608, 42484, 1239, 324, 44, 1880, 32, 13501, 829, 1686, 9203],
        backgroundColor: [
            'rgba(255, 205, 86, 0.2)'
        ],
        borderColor: [
            'rgba(255, 205, 86)'
        ],
        borderWidth: 1
    }

    let inputDatasets4 = {
        label: '45-54',
        data: [1083, 90, 10453, 700, 464, 4540, 25664, 5447, 11379, 645, 52675, 2351, 209, 88, 3129, 16, 17909, 1036, 1763, 10849],
        backgroundColor: [
            'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
            'rgba(75, 192, 192)'
        ],
        borderWidth: 1
    }

    let inputDatasets5 = {
        label: '55-64',
        data: [925, 53, 9526, 382, 292, 4504, 21550, 4994, 11602, 377, 47833, 3094, 108, 101, 2715, 48, 15589, 1228, 1722, 10562],
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
            'rgba(54, 162, 235)'
        ],
        borderWidth: 1
    }

    const barChartData = {
        labels: chartLabels,
        datasets: [ inputDatasets, inputDatasets2, inputDatasets3, inputDatasets4, inputDatasets5 ]
    }

    return (
        <Bar
            data={barChartData}
            options={{
                responsive: true,
            }}
        />
    )
}

export default DepartmentAgeBarChart