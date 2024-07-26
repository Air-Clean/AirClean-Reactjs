import { useEffect } from "react";
import { Chart } from 'chart.js';

export default function UtilityBar(){

    useEffect(() => {
        const utilBar = document.getElementById('barbar');
        new Chart(utilBar, {
            type: 'scatter',
            data: {
                labels: ['정기정비', '', '3월', '4월'],
                datasets: [{
                    type : 'bar',
                    label: 'Cost',
                    data: [
                        200000000,
                        300000000,
                        303030000,
                        45555555,
                    ],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                },
                {
                    type : 'line',
                    label : 'Average',
                    data : [
                        33444335,124344344,222222442,44444444
                    ],
                    fill : false ,
                    borderColor: 'rgb(54, 162, 235)'
                }
            ]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true

            }
        });
    }, []);
    return(
        <canvas id='barbar'></canvas>
    )
}