import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getQuantityByStock } from '../../api/ProductApi';

const ProductsByStock = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByStock();

            if (data) {
                const seriesData = data.map(item => Number(item.count));
                const labels = data.map(item => {
                    const [minStock, maxStock] = item.stock_range;
                    if (!(maxStock === null)) {
                        return `${minStock} - ${maxStock}`;
                    } else {
                        return `+${minStock}`;
                    }
                });

                setChartData({
                    options: {
                        labels: labels,
                        legend: {
                            show: true
                        },
                        title: {
                            text: 'Product Quantity by Stock',
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
            type="pie"
            className="apexchart"
        />
    );
};

export default ProductsByStock;