import { Chart } from 'chart.js';
import { useEffect } from 'react';

export default function RevenuePie(){

    useEffect(() => {
        const revenuePie = document.getElementById('piepie');
        new Chart(revenuePie, {
            type: 'pie',
            data: {
                labels: ['1월', '2월', '3월', '4월'],
                datasets: [{
                    label: '월매출액',
                    borderWidth: 3,
                    data: [
                        200000000,
                        300000000,
                        303030000,
                        45555555,
                    ]
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true

            }
        });
    }, []);

    return(
        <canvas id='piepie'></canvas>
    )
}