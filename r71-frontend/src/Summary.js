import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    LineController,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    LineController
);

const Summary = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('/api/summary-data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setChartData(response.data);
            } catch (error) {
                console.error('Error fetching summary data:', error);
            }
        };
        fetchData();
    }, []);

    if (!chartData) {
        return (
            <div className="container mt-5 text-center">
                <p>Loading chart data...</p>
            </div>
        );
    }

    // Prepare data for the chart
    const data = {
        labels: chartData.map((item) => item.year), // X-axis labels
        datasets: [
            {
                type: 'bar',
                label: 'Venture Capital (Billion $)',
                data: chartData.map((item) => item.ventureCapital),
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
            },
            {
                type: 'line',
                label: 'Federal Reserve Interest Rate (%)',
                data: chartData.map((item) => item.interestRate), // Line chart data
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.4, // Smooth line
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Clean Tech Venture Capital and Interest Rates',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Investment Flows (Billion $) / Interest Rate (%)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Years',
                },
            },
        },
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <header className="mb-4">
                    <h1 className="text-primary">Summary</h1>
                </header>
                <section>
                    <div className="chart-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {/* Add a unique key to force re-render */}
                        <Bar key={chartData ? chartData.length : 0} data={data} options={options} />
                    </div>
                    <p className="mt-4">
                        The chart shows the correlation between venture capital investments in clean technology and the
                        US Federal Reserve interest rates. A sharp contraction in VC financing since 2021 shows that
                        high interest rates imply higher costs of financing and deter emerging clean tech startup
                        financing. However, clean energy-specific investments, including those that target advanced
                        batteries and the grid, have proved somewhat more resilient, underscoring this strategic
                        necessity of ratcheting up the efforts toward innovation to meet net-zero emissions targets. The
                        chart highlights the need to shape up the market and policy incentives toward late-stage clean
                        technology projects to sustain investments. It’s certainly true that, as flows of clean energy
                        investment grow further globally, overcoming venture capital obstacles will be pivotal for the
                        U.S. in maintaining a competitive advantage in the clean energy market.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Summary;
