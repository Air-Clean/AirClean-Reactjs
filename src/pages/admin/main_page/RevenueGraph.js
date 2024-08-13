import React from 'react';
import Chart from 'react-apexcharts';

export default function RevenueGraph({ revenue }) {
    const monthRevenue = revenue.month;

    const groupByDate = (monthRevenue) => {
        return monthRevenue.reduce((acc, curr) => {
            const date = curr.branchSubmissionDate;
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += curr.totalBranchSalesCost;
            return acc;
        }, {});
    };

    const getMonthDates = () => {
        // 현재 날짜 가져오기
        const today = new Date();

        // 현재 년도와 월을 가져오기
        const year = today.getFullYear();
        const month = today.getMonth(); // 월은 0부터 시작합니다.

        // 시작일과 종료일을 계산합니다.
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0); // 다음 달의 0일은 현재 월의 마지막 날

        // 날짜 배열을 생성합니다.
        const dates = [];
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            const day = d.getDate().toString().padStart(2, '0');
            const month = (d.getMonth() + 1).toString().padStart(2, '0'); // 월은 1부터 시작합니다.
            const year = d.getFullYear();
            dates.push(`${year}-${month}-${day}`);
        }

        return dates;
    };

    const monthDates = getMonthDates();
    const groupedData = groupByDate(monthRevenue);

    const revenueByDate = monthDates.map(date =>
        groupedData[date] || 0 // 해당 날짜의 매출 합계, 없으면 0
    );

    const options = {
        chart: {
            height: '100%',
            type: 'line'
        },
        stroke: {
            width: 5,
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: monthDates,
            tickAmount: 10,
            labels: {
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
                }
            }
        },
        title: {
            text: 'Trend',
            align: 'left',
            style: {
                fontSize: '16px',
                color: '#333'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        }
    };

    const series = [
        {
            name: 'Sales',
            data: revenueByDate
        }
    ];

    return (
        <Chart options={options} series={series} type="line" height="100%" />
    );
}
