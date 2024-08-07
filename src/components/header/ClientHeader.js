import React, { useState } from 'react';
import { NavLink ,useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/logo2.png'; // 로고 이미지 경로를 알맞게 수정하세요
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { callLogoutAPI } from '../../apis/MemberAPICalls';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';


const AdminHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDropdown = () => setDropdownVisible(true);
  const hideDropdown = () => setDropdownVisible(false);

  const changeColor = (index) => {
    setActiveMenu(index);
  };
  
  const logoutHandler = () => {
    const members = jwtDecode(window.localStorage.getItem('accessToken'));

    window.localStorage.removeItem('accessToken');

    dispatch(callLogoutAPI());

    alert(`${members.memberName} 님 로그아웃 하셨습니다`);
    navigate("/", { replace: true });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const goMain=()=>{
    navigate("/location/facilityAndLaundry", { replace: false });
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.logo} onClick={goMain} style={{cursor : 'pointer'}}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.actions}>
            <div style={{position:'relative'}}>
              <Button aria-describedby={id} variant="contained" onClick={handleClick} style={{marginRight:'20px'}}>
                Alarm 
              </Button>
              <Badge color="secondary" badgeContent={0} showZero style={{position:'absolute', top:'5px', left:'0'}}>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  style={{transform: 'none'}}
                >
                  <Typography sx={{ p: 2 }}>예시1.</Typography>
                  <Typography sx={{ p: 2 }}>예시2.</Typography>
                  <Typography sx={{ p: 2 }}>예시3.</Typography>

                </Popover>
              </Badge>
            </div>
            <button className={styles.signUp} onClick={logoutHandler}>Log out</button>
          </div>
        </header>
      </div>
      <div>
        <nav className={styles.nav} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
          <ul className={styles.menu}>
            <li
              className={`${styles.menuItem} ${activeMenu === 1 ? styles.active : ''}`}
              onClick={() => changeColor(1)}
            >
              <div>세탁물관리</div>
            </li>
            <li
                className={`${styles.menuItem} ${activeMenu === 6 ? styles.active : ''}`}
                onClick={() => changeColor(6)}
              >
              <div>지점관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 2 ? styles.active : ''}`}
              onClick={() => changeColor(2)}
            >
              <div>보고서관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 3 ? styles.active : ''}`}
              onClick={() => changeColor(3)}
            >
              <div>재고관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 4 ? styles.active : ''}`}
              onClick={() => changeColor(4)}
            >
              <div>물류시스템</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 5 ? styles.active : ''}`}
              onClick={() => changeColor(5)}
            >
              <div>시설물현황</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 6 ? styles.active : ''}`}
              onClick={() => changeColor(6)}
            >
              <div>인적자원</div>
            </li>
          </ul>
          {dropdownVisible && (
            <div className={styles.dropdown}>
              <ul className={styles.dropdownMenu} style={{ textAlign: 'center' }}>
                <li className={styles.menuItem1} onClick={() => changeColor(1)}>
                  <NavLink to="facilityAndLaundry" activeClassName={styles.active}>세탁물 관리</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="laundryRegistration" activeClassName={styles.active}>세탁물 등록</NavLink>
                      <ul className={styles.submenu}>
                        {/* <li><NavLink to="#submenu1-1-2" activeClassName={styles.active}>1-2</NavLink></li> */}
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem6} onClick={() => changeColor(6)}>
                  <NavLink to="branchClient" activeClassName={styles.active}>지점관리</NavLink>
                </li>
                <li className={styles.menuItem2} onClick={() => changeColor(2)}>
                  <NavLink to="paper/locationNewReports" activeClassName={styles.active}>보고서 양식</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="paper/myReports" activeClassName={styles.active}>보고서 조회</NavLink>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem3} onClick={() => changeColor(3)}>
                  <NavLink to="#submenu1-3" activeClassName={styles.active}>3</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="#submenu1-3-1" activeClassName={styles.active}>3-1</NavLink>
                      <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-3-2" activeClassName={styles.active}>3-2</NavLink></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem4} onClick={() => changeColor(4)}>
                  <NavLink to="cardelivery" activeClassName={styles.active}>물류시스템</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      {/* <NavLink to="#submenu1-4-1" activeClassName={styles.active}>4-1</NavLink> */}
                      <ul className={styles.submenu}>
                        {/* <li><NavLink to="#submenu1-4-2" activeClassName={styles.active}>4-2</NavLink></li> */}
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem5} onClick={() => changeColor(5)}>
                  <NavLink to="facility" activeClassName={styles.active}>시설물현황</NavLink>
                  {/* <ul className={styles.submenu}>
                    <li>
                      <NavLink to="#submenu1-5-1" activeClassName={styles.active}>5-1</NavLink>
                      <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-5-2" activeClassName={styles.active}>5-2</NavLink></li>
                      </ul>
                    </li>
                  </ul> */}
                </li>
                <li className={styles.menuItem6} onClick={() => changeColor(6)}>
                  <NavLink
                    to="members/employee"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    직원
                  </NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink
                        to="members/branch"
                        className={({ isActive }) =>
                          isActive ? styles.active : ""
                        }
                      >
                        지점장
                      </NavLink>
                      <ul className={styles.submenu}>
                        <li>
                          <NavLink
                            to="members/driver"
                            className={({ isActive }) =>
                              isActive ? styles.active : ""
                            }
                          >
                            차량기사
                          </NavLink>
                          <ul className={styles.submenu}>
                            <li>
                              <NavLink
                                to="members/temp"
                                className={({ isActive }) =>
                                  isActive ? styles.active : ""
                                }
                              >
                                보류기록
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default AdminHeader;
