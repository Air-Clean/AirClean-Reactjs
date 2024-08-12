import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './BranchStockGraph.css';

function BranchStockGraph({ selectedItem, previousItem, getAverage }) {
  if (!selectedItem) return null;

  const detergentLabels = ['bDetergent', 'bSoftener', 'bBleach', 'bRemover', 'bDrumCleaner', 'bSheet'];
  const detergentLabelNames = ['세제', '섬유유연제', '표백제', '얼룩제거제', '드럼클리너', '시트'];

  const filterLabels = ['bLaundryFilter', 'bDryerFilter', 'bDryCleanerFilter'];
  const filterLabelNames = ['세탁필터', '건조기 필터', '드라이 클리너 필터'];

  const currentDetergentData = detergentLabels.map(label => selectedItem[label]);
  const previousDetergentData = previousItem ? detergentLabels.map(label => previousItem[label]) : Array(detergentLabels.length).fill(0);
  const averageDetergentData = detergentLabels.map(label => getAverage(label));

  const currentFilterData = filterLabels.map(label => selectedItem[label]);
  const previousFilterData = previousItem ? filterLabels.map(label => previousItem[label]) : Array(filterLabels.length).fill(0);
  const averageFilterData = filterLabels.map(label => getAverage(label));

  const detergentData = {
    labels: detergentLabelNames,
    datasets: [
      {
        label: '이번 수량',
        data: currentDetergentData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '직전 수량',
        data: previousDetergentData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: '평균 수량',
        data: averageDetergentData,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const filterData = {
    labels: filterLabelNames,
    datasets: [
      {
        label: '이번 수량',
        data: currentFilterData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '직전 수량',
        data: previousFilterData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: '평균 수량',
        data: averageFilterData,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="branchStock-graph">
        <Bar data={detergentData} options={options} />
        </div>
      <div className="branchStock-graph">
        <Bar data={filterData} options={options} />
      </div>
    </>
  );
}

export default BranchStockGraph;
