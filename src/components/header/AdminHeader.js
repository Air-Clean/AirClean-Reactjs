import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo2.png"; // 로고 이미지 경로를 알맞게 수정하세요
import { useDispatch, useSelector } from "react-redux";
import { callLogoutAPI, callAlarmMessage , callMemberChangePassword} from "../../apis/MemberAPICalls";
import jwtDecode from "jwt-decode";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/joy";

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
    const members = jwtDecode(window.localStorage.getItem("accessToken"));

    window.localStorage.removeItem("accessToken");

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

  const members = jwtDecode(window.localStorage.getItem("accessToken"));

  console.log("header ", members);

  useEffect(() => {
    if (members.memberRole === "a") {
      dispatch(callAlarmMessage());
    }
  }, []);

  const givePassword=e=>{
    console.log(e.currentTarget.name)
    dispatch(callMemberChangePassword({memberId : e.target.name}));
    window.location.reload();
  }

  const message = useSelector((state) => state.alarmMessageReducer);
  console.log("message 잘 왔는가? ", message);

  const count = message?.ask?.length;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.actions}>
            <div style={{ position: "relative" }}>
              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                style={{ marginRight: "20px" }}
              >
                Alarm
              </Button>
              <Badge
                color="secondary"
                badgeContent={count}
                showZero
                style={{ position: "absolute", top: "5px", left: "0" }}
              >
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    style: {
                      width: "400px",
                      overflow: "auto",
                      maxHeight: "600px",
                    },
                  }}
                >
                  {message? message.ask?.map((a, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "16px",
                        borderBottom: "1px solid #ccc",
                        borderTop : "1px solid #ccc"
                      }}
                    >
                      <div style={{display : 'flex' , alignItems : 'center' , justifyContent : 'space-between'}}>
                      <Avatar src={a.memberImage}/>
                      {a.memberId} {a.memberName} 
                      </div>
                      <div>
                        {a.askDescription}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "8px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: "8px" }}
                          onClick={e=>givePassword(e)}
                          name={a.memberId}
                        >
                          확인
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleClose}
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div>
                      메시지가 없습니다
                    </div>
                  )}
                </Popover>
              </Badge>
            </div>
            <button className={styles.signUp} onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </header>
      </div>
      <div>
        <nav
          className={styles.nav}
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
        >
          <ul className={styles.menu}>
            <li
              className={`${styles.menuItem} ${
                activeMenu === 1 ? styles.active : ""
              }`}
              onClick={() => changeColor(1)}
            >
              <div>재무분석</div>
            </li>
            <li
              className={`${styles.menuItem} ${
                activeMenu === 2 ? styles.active : ""
              }`}
              onClick={() => changeColor(2)}
            >
              <div>데이터예측</div>
            </li>
            <li
              className={`${styles.menuItem} ${
                activeMenu === 3 ? styles.active : ""
              }`}
              onClick={() => changeColor(3)}
            >
              <div>지점관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${
                activeMenu === 5 ? styles.active : ""
              }`}
              onClick={() => changeColor(5)}
            >
              <div>재고관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${
                activeMenu === 6 ? styles.active : ""
              }`}
              onClick={() => changeColor(6)}
            >
              <div>물류시스템</div>
            </li>
            <li
              className={`${styles.menuItem} ${
                activeMenu === 7 ? styles.active : ""
              }`}
              onClick={() => changeColor(7)}
            >
              <div>보고서관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${
                activeMenu === 8 ? styles.active : ""
              }`}
              onClick={() => changeColor(8)}
            >
              <div>인적자원</div>
            </li>
          </ul>
          {dropdownVisible && (
            <div className={styles.dropdown}>
              <ul
                className={styles.dropdownMenu}
                style={{ textAlign: "center" }}
              >
                <li className={styles.menuItem1} onClick={() => changeColor(1)}>
                  <NavLink
                    to="financial"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    재무분석
                  </NavLink>
                </li>
                <li className={styles.menuItem2} onClick={() => changeColor(2)}>
                  <NavLink
                    to="#submenu1-2"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    가고싶은 주소
                  </NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink
                        to="#submenu1-2-1"
                        className={({ isActive }) =>
                          isActive ? styles.active : ""
                        }
                      >
                        2-1
                      </NavLink>
                      <ul className={styles.submenu}>
                        <li>
                          <NavLink
                            to="#submenu1-2-2"
                            className={({ isActive }) =>
                              isActive ? styles.active : ""
                            }
                          >
                            2-2
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem3} onClick={() => changeColor(3)}>
                  <NavLink
                    to="branch"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    지점관리
                  </NavLink>
                </li>
                <li className={styles.menuItem5} onClick={() => changeColor(5)}>
                  <NavLink
                    to="stock/application"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    재고관리
                  </NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink
                        to="stock/history"
                        className={({ isActive }) =>
                          isActive ? styles.active : ""
                        }
                      >
                        내역조회
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem6} onClick={() => changeColor(6)}>
                  <NavLink
                    to="car"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    물류시스템관리
                  </NavLink>
                </li>
                <li className={styles.menuItem7} onClick={() => changeColor(7)}>
                  <NavLink
                    to="paper/newReports"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    보고서 작성
                  </NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink
                        to="paper/reports"
                        className={({ isActive }) =>
                          isActive ? styles.active : ""
                        }
                      >
                        보고서 조회
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem8} onClick={() => changeColor(8)}>
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
