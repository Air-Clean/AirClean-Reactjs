import './StockBarChart.css';
import {useState} from 'react';

function StockBarChart() {

    const [data] = useState([
        { item: '세제', percentage: 30 },
        { item: '섬유유연제', percentage: 60 },
        { item: '표백제', percentage: 85 },
        ]);
        const [hoveredItem, setHoveredItem] = useState(null);
        
        const getColor = (percentage) => {
            if (percentage >= 0 && percentage <= 40) {
            return 'rgba(255, 0, 0, 0.7)'; // 빨간색, 투명도 70%
            } else if (percentage >= 41 && percentage <= 75) {
            return 'rgba(0, 0, 255, 0.7)'; // 파란색, 투명도 70%
            } else if (percentage >= 76 && percentage <= 100) {
            return 'rgba(0, 255, 0, 0.7)'; // 초록색, 투명도 70%
            } else {
            return 'rgba(0, 0, 0, 0.7)'; // 기본값, 검정색, 투명도 70%
            }
        };
        
        const handleMouseEnter = (item) => {
            setHoveredItem(item);
        };
        
        const handleMouseLeave = () => {
            setHoveredItem(null);
        };
        
        return (
            <div className='app_appli_info'>
            <div className='stock_bar_chart'>
                <h4>가로 막대 그래프</h4>
                <div className='bar-container-horizontal'>
                {data.map((item, index) => (
                    <div
                    key={index}
                    className='bar-horizontal'
                    style={{
                        width: `${item.percentage}%`,
                        backgroundColor: getColor(item.percentage),
                    }}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={handleMouseLeave}
                    >
                    {hoveredItem === item && (
                        <span className='tooltip-horizontal'>{item.percentage}%</span>
                    )}
                    </div>
                ))}
                </div>
            </div>
            </div>
        );
}

export default StockBarChart;