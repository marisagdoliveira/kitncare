"use client";

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
    const { totalRecursos, totalConsumo } = props;

    // Calculate consumption percentage
    const consumoPercentage = (totalConsumo / totalRecursos) * 100;

    // Debugging logs
    console.log("Total Recursos:", totalRecursos);
    console.log("Total Consumo:", totalConsumo);
    console.log("Consumo Percentage:", consumoPercentage);

    // Determine the color based on the percentage
    let backgroundColor, hoverBackgroundColor;
    if (consumoPercentage >= 80) {
        backgroundColor = '#FF5733';
        hoverBackgroundColor = '#FF5733';
    } else if (consumoPercentage >= 60 && consumoPercentage < 80) {
        backgroundColor = '#FFA500';
        hoverBackgroundColor = '#FFA500';
    } else {
        backgroundColor = '#4CAF50';
        hoverBackgroundColor = '#45A049';
    }

    // Debugging logs for colors
    console.log("Background Color:", backgroundColor);

    // Prepare the data for the chart
    const data = {
        datasets: [
            {
                data: [consumoPercentage, 100 - consumoPercentage], // Use percentages for consistency
                backgroundColor: [backgroundColor, '#E0E0E0'],
                hoverBackgroundColor: [hoverBackgroundColor, '#D3D3D3'],
            },
        ],
        labels: ['Consumo', 'Restante'],
    };

    // Define options (if any)
    const options = {};

    return <div className="relative w-32 h-32">
        <div>
            <Pie data={data} options={options} />
        </div>
    </div>;
};

export default PieChart;
