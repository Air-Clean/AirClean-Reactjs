import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';

// Chart.js에서 사용될 모든 요소를 등록합니다.
Chart.register(...registerables);

export default function RevenuePie({ revenue }) {
    const chartRef = useRef(null); // 차트를 참조할 ref를 생성합니다.

    console.log('파이 그래프 revenue', revenue);

    // 각 지역의 매출 합계 계산
    const regions = ['동부', '서부', '중앙', '남부', '북부'];
    const regionSums = regions.map(region => {
        return revenue.month
            .filter(r => r.branch.branchRegion === region)
            .reduce((sum, e) => sum + e.totalBranchSalesCost, 0);
    });

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        
        // 기존 차트 인스턴스가 있으면 삭제합니다.
        if (ctx.chart) {
            ctx.chart.destroy();
        }

        // 새로운 차트 생성
        const pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: regions,
                datasets: [{
                    borderWidth: 3,
                    data: regionSums,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true
            }
        });

        // 차트 인스턴스를 ctx에 저장하여 나중에 삭제할 수 있도록 합니다.
        ctx.chart = pieChart;

        // 컴포넌트 언마운트 시 차트 인스턴스 정리
        return () => {
            if (ctx.chart) {
                ctx.chart.destroy();
            }
        };
    }, [revenue, regionSums]); // 종속성 배열에 revenue와 계산된 regionSums를 추가합니다.

    return (
        <canvas ref={chartRef}></canvas>
    );
}
