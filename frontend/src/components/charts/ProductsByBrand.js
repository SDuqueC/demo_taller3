import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getQuantityByBrand } from '../../api/ProductApi';

const ProductsByBrand = () => {
    const [chartData, setChartData] = useState({ options: {}, series: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getQuantityByBrand();

            if (data) {
                //const seriesData = data.map(item => Number(item.count));

                const seriesData = data.map(item => {
                    return {
                        name: [item.brand],
                        data: [Number(item.count)]
                    };
                });

                setChartData({
                    options: {
                        chart: {
                            id: 'basic-bar',
                        },
                        xaxis: {
                            categories: seriesData.map(item => item.name)
                        },
                        plotOptions: {
                            bar: {
                                borderRadius: 4,
                                borderRadiusApplication: 'end'
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        title: {
                            text: 'Product Quantity by Brand',
                        }
                    },
                    series: seriesData
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div className="apexchart">
            <Chart
                options={chartData.options}
                series={chartData.series}
                type='bar'
                height="350"
            />
        </div>
    );
};

export default ProductsByBrand;