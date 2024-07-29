import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './BranchStockGraph.css';

function BranchStockGraph({ selectedItem, previousItem, getAverage }) {
  if (!selectedItem) return null;

  const labels = ['bDetergent', 'bSoftener', 'bBleach', 'bRemover', 'bDrumCleaner', 'bSheet'];
  const labelNames = ['세제', '섬유유연제', '표백제', '얼룩제거제', '드럼클리너', '시트'];

  const currentData = labels.map(label => selectedItem[label]);
  const previousData = previousItem ? labels.map(label => previousItem[label]) : Array(labels.length).fill(0);
  const averageData = labels.map(label => getAverage(label));

  const data = {
    labels: labelNames,
    datasets: [
      {
        label: '이번 수량',
        data: currentData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '직전 수량',
        data: previousData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: '평균 수량',
        data: averageData,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: '수량 비교',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="branchStock-graph">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BranchStockGraph;
