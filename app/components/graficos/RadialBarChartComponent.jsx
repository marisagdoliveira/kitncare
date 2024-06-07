"use client"; 

import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const RadialBarChartComponent = (props) => {
    const totalRecursos = props.totalRecursos;
    const totalConsumo = props.totalConsumo;

    if (totalRecursos === 0) {
        console.error('totalRecursos cannot be zero.');
        return null;
    }

    const consumoPercentage = Math.round((totalConsumo / totalRecursos) * 100);

    const data = [
        {
            name: 'Consumo',
            value: consumoPercentage,
            fill: consumoPercentage >= 80 ? '#FF5733' : consumoPercentage >= 60 ? '#FFA500' : '#4CAF50'
        },
        {
            name: 'Restante',
            value: 100 - consumoPercentage,
            fill: '#E0E0E0'
        }
    ];

    return (
        <RadialBarChart width={200} height={200} innerRadius="70%" outerRadius="90%" data={data}>
            <RadialBar minAngle={15} label={{ fill: '#000', position: 'insideStart' }} background clockWise dataKey="value" />
            <Tooltip />
            <Legend />
        </RadialBarChart>
    );
};

export default RadialBarChartComponent;