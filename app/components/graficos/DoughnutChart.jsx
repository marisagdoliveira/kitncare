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

    const consumoPercentage = Math.round((totalConsumo / totalRecursos) * 100);
    console.log('consumoPercentage:', consumoPercentage);

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

    console.log('backgroundColor:', backgroundColor);

    const data = {
        datasets: [
            {
                data: [consumoPercentage, 100 - consumoPercentage],
                backgroundColor: [backgroundColor, '#E0E0E0'],
                hoverBackgroundColor: [hoverBackgroundColor, '#D3D3D3'],
            },
        ],
    };

    const options = {
        cutout: '70%',
    };

    return <div className="relative w-32 h-32">
        <div>
            <Doughnut data={data} options={options} />
        </div>
    </div>;
};

export default DoughnutChart;