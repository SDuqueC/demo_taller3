import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getQuantityByCategory } from '../../api/ProductApi';

const ProductsByCategory = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByCategory();

            if (data) {
                const seriesData = data.map(item => Number(item.count));
                const labels = data.map(item => item.category);

                setChartData({
                    options: {
                        labels: labels,
                        legend: {
                            show: true
                        },
                        title: {
                            text: 'Product Quantity by Category',
                        },
                    },
                    series: seriesData,
                });
            }
        };

        fetchData();
    }, []);

    return (
        <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            className="apexchart"
        />
    );
};

export default ProductsByCategory;