"use client";

import React from 'react';

const ProgressBar = (props) => {
    const totalRecursos = props.totalRecursos;
    const totalConsumo = props.totalConsumo;

    if (totalRecursos === 0) {
        console.error('totalRecursos cannot be zero.');
        return null;
    }

    const consumoPercentage = Math.round((totalConsumo / totalRecursos) * 100);
    const remainingPercentage = 100 - consumoPercentage;

    let backgroundColor;
    if (consumoPercentage >= 80) {
        backgroundColor = '#FF5733';
    } else if (consumoPercentage >= 60 && consumoPercentage < 80) {
        backgroundColor = '#FFA500';
    } else {
        backgroundColor = '#4CAF50';
    }

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: '#E0E0E0',
        borderRadius: 50,
        margin: 10
    };

    const fillerStyles = {
        height: '100%',
        width: `${remainingPercentage}%`,
        backgroundColor: backgroundColor,
        borderRadius: 'inherit',
        textAlign: 'right'
    };

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${remainingPercentage}%`}</span> 
            </div>
        </div>
    );
};

export default ProgressBar;
