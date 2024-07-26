import { Chart } from 'chart.js';
import { useEffect } from 'react';

export default function RevenueGraph(){

    useEffect(()=>{
        const revenueGraph = document.getElementById('graphgraph');

        new Chart(revenueGraph, {
            type: 'line',
            data: {
                labels: ['1월', '2월', '3월', '4월'],
                datasets: [{
                    label: '월매출액',
                    borderWidth: 3,
                    fill : true,
                    data: [
                        200000000,
                        300000000,
                        303030000,
                        45555555,
                    ]
                },
                {
                    label : '월매출액 2',
                    borderWidth : 3,
                    fill : true,
                    data : [
                        12414421,
                        5675676576,
                        47774884,
                        49993333
                    ]
                }
            ]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true

            }
        });
    },[])

    return(
        <canvas id='graphgraph'></canvas>
    )
}