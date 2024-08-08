import "./BranchinformationCss.css";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Badge from '@mui/material/Badge';
import noImage from '../../assets/no-image.png'
import Avatar from "@mui/joy/Avatar";

export default function BranchInformation({ branch, facility }) {
  const [manager, setManager] = useState("");

  useEffect(() => {
    if (branch) {
        console.log(' branch 있는거 아니야 ? ',branch)
      if (branch?.branchOwnerPageDTOS?.length !== 0) {
        setManager(branch?.branchOwnerPageDTOS[0]?.membersPageDTO);
      } else {
        setManager("");
      }
    }
  }, [branch]);

  return (
    <div
      style={{
        backgroundColor: "#fbfcfe",
        width: "600px",
        height: "100%",
        borderRadius: "10px",
        border: "1px solid #cfd7e0",
        padding: "10px",
      }}
      className="branchInformationBox"
    >
      <div className="branchInformationHeader">
        {branch ? (<><div className="branchInfromationImage">
          <img
            src={branch.branchImage}
            alt="이미지 준비중"
            width={"60%"}
            height={"60%"}
            style={{ borderRadius: "5px" }}
            onError={(e)=>{e.target.onerror = null ; e.target.src = noImage; }}
          />
          <div>{branch?.branchName}</div>
        </div>
        <div className="branchInfromationText">
          <p>
            <strong>지점 코드 : </strong>
            {branch?.branchCode}
          </p>
          <p>
            <strong>전화 번호 : </strong>
            {branch?.branchPhone}
          </p>
          <p>
            <strong>주소 : </strong>
            {branch?.branchAddress}
          </p>
          <p>
            <strong>개점일 : </strong>
            {branch?.branchOpenDate}
          </p>
        </div></>) : ''}
        
      </div>
      <div className="branchInformationContent">
        {branch ? (
            <>
                <div>
          <Avatar
            src={manager?.memberImage || "/static/images/avatar/1.jpg"}
            sx={{ "--Avatar-size": "6rem" }}
          />
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <strong>E-mail</strong> : {manager.memberEmail}
          </div>
          <div>
            <strong>Phone</strong> : {manager.memberPhoneNumber}
          </div>
          <div>
            <strong>Birth</strong> : {manager.memberBirthDate}
          </div>
          <div>
            <strong>Gender</strong> : {manager.memberGender}
          </div>
          <div>
            <strong>Address</strong> : {manager.memberAddress}
          </div>
        </div>
            </>
        ) : <div style={{fontWeight : 'bolder'}}>Select Branch</div>}
        
      </div>
      <div className="branchInformationFooter">
        <h5>시설물 정보</h5>
        <div
          style={{
            width: "100%",
            height: "100%",
            ontSize: "12px",
            overflow: "hidden",
          }}
        >
          <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Facility</TableCell>
                  <TableCell>전체</TableCell>
                  <TableCell>유휴</TableCell>
                  <TableCell>수리중</TableCell>
                  <TableCell>폐기</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Row row={facility.laundry} name={"세탁기"} />
                <Row row={facility.dry} name={"건조기"} />
                <Row row={facility.cleaner} name={"드라이클리너"} />
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

function Row({ row, name }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell>{row.length}</TableCell>
        <TableCell>
          {row.filter((r) => r.facilityStatus === "H").length}
        </TableCell>
        <TableCell>
          {row.filter((r) => r.facilityStatus === "F").length}
        </TableCell>
        <TableCell>
          {row.filter((r) => r.facilityStatus === "D").length}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>시설번호</TableCell>
                    <TableCell>상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((r) => (
                    <TableRow key={r.facilityId} >
                      <TableCell>{r.facilityId}</TableCell>
                      <TableCell>
                        {(() => {
                          console.log("sdfsf");
                          switch (r.facilityStatus) {
                            case "W":
                              return(
                              <Badge variant="dot" color="primary" anchorOrigin={{vertical : 'top', horizontal: 'left'}}>
                                사용중
                              </Badge>
                              )
                              ;
                            case "D":
                              return(
                                <Badge variant="dot" color="error" anchorOrigin={{vertical : 'top', horizontal: 'left'}}>
                                  페기
                                </Badge>
                                )
                              ;
                            case "H":
                              return(
                                <Badge variant="dot" color="success" anchorOrigin={{vertical : 'top', horizontal: 'left'}}>
                                  유휴
                                </Badge>
                                );
                            case "F":
                              return(
                                <Badge variant="dot" color="warning" anchorOrigin={{vertical : 'top', horizontal: 'left'}}>
                                  수리중
                                </Badge>
                                );
                            default:
                              return undefined;
                          }
                        })()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
