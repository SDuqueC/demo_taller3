import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getQuantityByBrand } from '../api/ProductApi';
import {ProductsByStock, ProductsByPrice, ProductsByBrand, ProductsByCategory} from '../components/chart';

const ProductsDashboard = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByBrand();

            if (data) {
                const seriesData = data.map(item => Number(item.count));
                const labels = data.map(item => item.brand);

                setChartData({
                    options: {
                        labels: labels,
                        legend: {
                            show: true
                        },
                        title: {
                            text: 'Product Quantity by Brand',
                        },
                    },
                    series: seriesData,
                });
            }
        };

        fetchData();
    }, []);

            /* <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                    className="apexchart-pie"
                />*/

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <ProductsByBrand />
            </div>
            <div className="row side-row">
                <ProductsByCategory />
            </div>
            <div className="row side-row">
                <div className="col side-col">
                    <ProductsByStock />
                </div>
                <div className="col side-col">
                    <ProductsByPrice />
                </div>
            </div>
        </div>
        /*<div>
            <ProductsByCategory />
        </div>
        <div>
            <ProductsByPrice />
        </div>*/
    );
};

export default ProductsDashboard;