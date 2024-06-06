"use client"; // Ensure this is at the very top

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChart = (props) => {
    const totalRecursos = props.totalRecursos;
    const totalConsumo = props.totalConsumo;

    if (totalRecursos === 0) {
        console.error('totalRecursos cannot be zero.');
        return null;
    }

    const consumoPercentage = Math.round((totalConsumo / totalRecursos) * 100);

    const data = {
        labels: ['Consumo', 'Restante'],
        datasets: [
            {
                label: 'Percentage',
                data: [consumoPercentage, 100 - consumoPercentage],
                backgroundColor: [
                    consumoPercentage >= 80 ? '#FF5733' : consumoPercentage >= 60 ? '#FFA500' : '#4CAF50',
                    '#E0E0E0'
                ],
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 100
            }
        }
    };

    return <div className="relative w-64 h-32">
        <Bar data={data} options={options} />
    </div>;
};

export default BarChart;