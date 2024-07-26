import { Outlet } from "react-router-dom";
import StockHistoryNavBar from "./StockHistoryNavBar";

function StockHistoryLayout() {

    return(
        <div className="menu1_layout">
            <div className='flex_wrap' style={{ display: 'flex', flexDirection: 'column' }}>
                <StockHistoryNavBar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default StockHistoryLayout;