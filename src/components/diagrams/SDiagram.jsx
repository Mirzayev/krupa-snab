import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Satisfied customers',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Rosie',
            data: [12, 5, 19, 5, 12, 8, 17],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dissatisfied',
            data: [2, 3, 2, 5, 5, 4, 6],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
    ],
};

export function SDiagram() {
    return <Bar options={options} data={data} />;
}

export default SDiagram;
