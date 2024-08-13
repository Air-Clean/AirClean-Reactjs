import { Chart, registerables } from 'chart.js';
import { useEffect } from 'react';

// Chart.js에서 사용될 모든 요소를 등록합니다.
Chart.register(...registerables);

export default function RevenuePie({ revenue  }) {
    console.log('파이 그래프 revenue', revenue);

    // 각 지역의 매출 합계 계산
    const east = revenue.month.filter(r => r.branch.branchRegion === '동부');
    const west = revenue.month.filter(r => r.branch.branchRegion === '서부');
    const center = revenue.month.filter(r => r.branch.branchRegion === '중앙');
    const south = revenue.month.filter(r => r.branch.branchRegion === '남부');
    const north = revenue.month.filter(r => r.branch.branchRegion === '북부');

    const eastSum = east.reduce((sum, e) => sum + e.totalBranchSalesCost, 0);
    const westSum = west.reduce((sum, e) => sum + e.totalBranchSalesCost, 0);
    const centerSum = center.reduce((sum, e) => sum + e.totalBranchSalesCost, 0);
    const southSum = south.reduce((sum, e) => sum + e.totalBranchSalesCost, 0);
    const northSum = north.reduce((sum, e) => sum + e.totalBranchSalesCost, 0);

    useEffect(() => {
        const ctx = document.getElementById('piepie').getContext('2d');
        
        // 기존 차트 인스턴스 삭제
        if (ctx.chart) {
            ctx.chart.destroy();
        }

        // 새로운 차트 생성
        const pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['동부', '서부', '중앙', '남부', '북부'],
                datasets: [{
                    borderWidth: 3,
                    data: [eastSum, westSum, centerSum, southSum, northSum],
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
    }, [revenue]);

    return (
        <canvas id='piepie'></canvas>
    );
}
