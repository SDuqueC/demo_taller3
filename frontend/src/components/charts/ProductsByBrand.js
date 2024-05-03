import React, { useEffect, useState } from 'react';
import { getQuantityByBrand } from '../../api/ProductApi';
import ReactApexChart from "react-apexcharts";

const ProductsByBrand = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByBrand();

            if (data) {

                const seriesData = data.map(item => Number(item.count));
                const labels = data.map(item => item.brand);

                const series = [{
                    data: seriesData
                }];

                setChartData({
                    options: {
                        chart: {
                            id: 'basic-bar',
                        },
                        xaxis: {
                            categories: data.map(item => item.brand)
                        },
                        plotOptions: {
                            bar: {
                                borderRadius: 4,
                                borderRadiusApplication: 'end',
                                distributed: true
                            }
                        },
                        colors: [ // this array contains different color code for each data
                            "#25c7ff",
                            "#2a617a",
                            "#ff3060",
                            "#f5770e",
                            "#7637ff",
                            "#66ff4b"
                        ],
                        dataLabels: {
                            enabled: false
                        },
                        legend: {
                            show: false
                        },
                        title: {
                            text: 'Product Quantity by Brand',
                        }
                    },
                    series: series
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div className="apexchart">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type='bar'
                height="350"
            />
        </div>
    );
};

export default ProductsByBrand;