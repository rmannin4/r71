import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('/api/reports-data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setChartData(response.data);
            } catch (error) {
                console.error('Error fetching reports data:', error);
            }
        };
        fetchData();
    }, []);

    if (!chartData) return <p className="text-center mt-4">Loading...</p>;

    const data = {
        labels: chartData.map((item) => item.category),
        datasets: [
            {
                label: 'Capacity (GW)',
                data: chartData.map((item) => item.value),
                backgroundColor: chartData.map((item) =>
                    item.type === 'Installed' ? 'rgba(54, 162, 235, 0.6)' : 'rgba(75, 192, 192, 0.3)'
                ),
                borderColor: chartData.map((item) =>
                    item.type === 'Installed' ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)'
                ),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'U.S. Geothermal Potential vs. Installed Capacity' },
        },
        scales: {
            y: {
                title: { display: true, text: 'Capacity (GW)' },
            },
        },
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <header className="mb-4">
                    <h1 className="text-primary">Reports</h1>
                </header>
                <section>
                    <div className="chart-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <Bar data={data} options={options} />
                    </div>
                    <p className="mt-4">
                        The chart of the current installed geothermal capacity in the United States and its potential
                        shows how geothermal energy is a prime example of how the country can leapfrog ahead of other
                        nations in this field. Engineered geothermal systems and advanced drilling methods borrowed from
                        U.S engineers could increase geothermal power by a factor of 140 times, placing geothermal energy
                        as a potent solution to zero carbon targets. This expansion will not only bring in constant clean
                        power, but also a flexible system to complement variable renewable energy, including the sun and
                        wind. One of the promising features of geothermal energy is the fact that it leverages America’s
                        existing drilling capability and can scale to help decarbonize high-energy industries such as
                        data centers and military bases. This chart shows geothermal energy as the virtually untapped
                        market for the U.S. to take leadership in clean energy products.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Reports;
