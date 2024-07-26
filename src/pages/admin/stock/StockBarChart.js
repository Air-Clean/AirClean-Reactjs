import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function StockBarChart({ labels, dataValues, inputValues, originalValues, onInputChange, onMaxClick }) {
  const backgroundColors = dataValues.map((value) => {
    if (value <= 35) {
      return 'rgba(255, 99, 132, 0.6)'; // 빨간색
    } else if (value <= 70) {
      return 'rgba(54, 162, 235, 0.6)'; // 파란색
    } else {
      return 'rgba(75, 192, 192, 0.6)'; // 초록색
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Stock Levels (%)',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
        x: {
        beginAtZero: true,
        max: 100,
        },
    },
    plugins: {
        tooltip: {
        callbacks: {
            label: function (context) {
            return `${originalValues[context.dataIndex]} units`; // 원래 stock 값으로 표시
            },
        },
        },
    },
    barThickness: 15, // 막대의 두께 설정
    };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '35vw' }}>
      <div style={{ flex: 1 }}>
        <Bar data={data} options={options} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
        {labels.map((label) => (
          <div key={label} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
            <label>
              <input
                type="number"
                name={label}
                value={inputValues[label] || ''}
                onChange={onInputChange}
                min="0"
                style={{ marginLeft: '5px' }}
              />
            </label>
          </div>
        ))}
      </div>
      <button className='stock_max_button' onClick={onMaxClick} style={{ marginLeft: '10px' }}>Max</button>
    </div>
  );
}

export default StockBarChart;