"use client";

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
    const { totalRecursos, totalConsumo } = props;

    const supplyRemainingPercentage = Math.round(((totalRecursos - totalConsumo) / totalRecursos) * 100);

    console.log("Total Recursos:", totalRecursos);
    console.log("Total Consumo:", totalConsumo);
    console.log("Supply Remaining Percentage:", supplyRemainingPercentage);

    let backgroundColor, hoverBackgroundColor;
    if (supplyRemainingPercentage <= 40) {
        backgroundColor = '#FF5733'; // Red for low supply
        hoverBackgroundColor = '#FF5733';
    } else if (supplyRemainingPercentage > 40 && supplyRemainingPercentage <= 70) {
        backgroundColor = '#FFA500'; // Orange for medium supply
        hoverBackgroundColor = '#FFA500';
    } else {
        backgroundColor = '#4CAF50'; // Green for high supply
        hoverBackgroundColor = '#45A049';
    }

    console.log("Background Color:", backgroundColor);

    const data = {
        datasets: [
            {
                data: [supplyRemainingPercentage, 100 - supplyRemainingPercentage],
                backgroundColor: [backgroundColor, '#E0E0E0'],
                hoverBackgroundColor: [hoverBackgroundColor, '#D3D3D3'],
            },
        ],
        labels: ['Remaining', 'Used'],
    };

    const options = {};

    return (
        <div className="relative w-32 h-32">
            <div>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default PieChart;
