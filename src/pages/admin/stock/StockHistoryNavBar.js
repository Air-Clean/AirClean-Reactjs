import { NavLink } from "react-router-dom";
import './StockHistoryNavBar.css'; // CSS 파일을 import

function StockHistoryNavBar() {

    const activeStyle = {
        backgroundColor: '#007BFF',
        color: 'white',
    };

    return (
        <div className="stock_navbar">
            <NavLink 
                to="/company/stock/history/headquaters" 
                style={({ isActive }) => isActive ? activeStyle : undefined} 
                className="stock_nav-button"
            >
                신청 내역
            </NavLink>
            <NavLink 
                to="/company/stock/history/branch" 
                style={({ isActive }) => isActive ? activeStyle : undefined} 
                className="stock_nav-button"
            >
                발주 내역
            </NavLink>
        </div>
    );
}

export default StockHistoryNavBar;
