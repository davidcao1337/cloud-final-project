import './dashboard.css';
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HouseHoldSpendBarChart = ( props ) => {
    
    console.log(props)
    const chartLabels = props.chartLabels
    const chartStats = props.barChartStats

    let inputDatasets = {
        label: 'Total Spent By Household Size',
        data: chartStats,
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

    const barChartData = {
        labels: chartLabels,
        datasets: [ inputDatasets ]
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

export default HouseHoldSpendBarChart