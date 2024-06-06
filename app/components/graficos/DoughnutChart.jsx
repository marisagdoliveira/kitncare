"use client"; // Ensure this is at the very top

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {
    const totalRecursos = props.totalRecursos;
    const totalConsumo = props.totalConsumo;

    console.log('totalRecursos:', totalRecursos);
    console.log('totalConsumo:', totalConsumo);

    if (totalRecursos === 0) {
        console.error('totalRecursos cannot be zero.');
        return null;
    }

    const supplyRemainingPercentage = Math.round(((totalRecursos - totalConsumo) / totalRecursos) * 100);
    console.log('supplyRemainingPercentage:', supplyRemainingPercentage);

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

    console.log('backgroundColor:', backgroundColor);

    const data = {
        datasets: [
            {
                data: [supplyRemainingPercentage, 100 - supplyRemainingPercentage],
                backgroundColor: [backgroundColor, '#E0E0E0'],
                hoverBackgroundColor: [hoverBackgroundColor, '#D3D3D3'],
            },
        ],
    };

    const options = {
        cutout: '70%',
    };

    return <div className="relative w-24 h-24">
        <div>
            <Doughnut data={data} options={options} />
        </div>
    </div>;
};

export default DoughnutChart;
