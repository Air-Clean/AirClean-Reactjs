import { Outlet, NavLink } from "react-router-dom";
import './FacilityLayout.css';

function FacilityManagement() {

    const activeStyle = {
        backgroundColor: '#007BFF',
        color: 'white',
    };

    return(
        <div className="menu1_layout">
            <div className="flex_wrap">
                <div className="facility_navbar">
                    <NavLink
                        to="/location/facility/drum"
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                        className="facility_nav-button"
                    >
                        세탁기
                    </NavLink>
                    <NavLink
                        to="/location/facility/dryer"
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                        className="facility_nav-button"
                    >
                        건조기
                    </NavLink>
                    <NavLink
                        to="/location/facility/dryCleaner"
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                        className="facility_nav-button"
                    >
                        드라이클리너
                    </NavLink>
                </div>
                <Outlet/>
            </div>
        </div>
    );

}

export default FacilityManagement;