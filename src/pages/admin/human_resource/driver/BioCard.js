import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import { Grid } from "@mui/material";
import { useState } from "react";
import Tooltip from '@mui/joy/Tooltip';
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import "animate.css";
import "./BioCard.css";
import logo from "../../../../assets/logo2.png";
import noProfile from "../../../../assets/no-profile.png";
import DriverModifyModal from "./DriverModifyModal";
import { getPhoneNumber } from "../../../../utils/makePhoneNumber";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import GiteIcon from "@mui/icons-material/Gite";
import EmailIcon from "@mui/icons-material/Email";
import ReactDOMServer from "react-dom/server";
import DrawIcon from '@mui/icons-material/Draw';
import ReactDOM from "react-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';


export default function BioCard({ driver, setDeleteMember, deleteMember }) {
  console.log("biocard=============================");

  
  let image = driver.memberImage;
    console.log(image?.split("/")[4]);

    console.log("image anjsi", image);

    if (image?.split("/")[4] === "null") {
      image = noProfile;
    }

 
    
    function showBusinessCard() {
      const businessCardHtml = ReactDOMServer.renderToString(
        <BusinessCard driver={driver} logo={logo} image={image} />
      );
    
      Swal.fire({
        showClass: {
          popup: `
            animate__animated
            animate__rotateInDownLeft
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__rotateOutDownLeft
            animate__faster
          `,
        },
        html: '<div id="business-card-container"></div>',
        width: "auto",
        padding: "10px",
        background: "transparent",
        customClass: {
          container: "swal2-container",
        },
        showConfirmButton: false,
        didRender: () => {
          ReactDOM.render(
            <BusinessCard
              driver={driver}
              logo={logo}
              image={image}
            />,
            document.getElementById("business-card-container")
          );
    
          if (document.getElementById("modifyButton")) {
            document.getElementById("modifyButton").addEventListener("click", toggle);
          }
    
          if (document.getElementById("rightButton")) {
            document.getElementById("rightButton").addEventListener("click", showBusinessCardBack);
          }
        },
      });
    }
    
    function showBusinessCardBack() {
      Swal.fire({
        showClass: {
          popup: `
            animate__animated
            animate__rotateInDownLeft
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__rotateOutDownLeft
            animate__faster
          `,
        },
        html: '<div id="business-card-back"></div>',
        width: "auto",
        padding: "10px",
        background: "transparent",
        customClass: {
          container: "swal2-container",
        },
        showConfirmButton: false,
        didRender: () => {
          ReactDOM.render(
            <BusinessCardBack car={driver.driverAndCarDTO.carDTO}/>,
            document.getElementById("business-card-back")
          );
    
          if (document.getElementById("leftButton")) {
            document.getElementById("leftButton").addEventListener("click", showBusinessCard);
          }
        },
      });
    }

  const [highlight, setHighlight] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    memberId: driver.memberId,
    memberName: driver.memberName,
    isPass: false,
    phone: driver.memberPhoneNumber,
    email: driver.memberEmail,
    address: driver.memberAddress,
    image: null,
    imagePreview: driver.memberImage,
  });

  const toggle = () => {
    console.log("수정버튼");
    setModal(!modal);

    setForm({
      memberId: driver.memberId,
      memberName: driver.memberName,
      isPass: false,
      phone: driver.memberPhoneNumber,
      email: driver.memberEmail,
      address: driver.memberAddress,
      image: null,
      imagePreview: driver.memberImage,
    });
    Swal.close();
  };

  const members =jwtDecode( window.localStorage.getItem('accessToken'))
  const role = members.memberRole;

  const deleteHandler = (e) => {
    setHighlight(!highlight);

    const changeDelete = toggleValue([...deleteMember], e.target.name);

    setDeleteMember(changeDelete);

    console.log("삭제 멤버 조회", deleteMember);
  };

  function toggleValue(array, value) {
    const index = array.indexOf(value);

    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    return array;
  }
  const phone = getPhoneNumber(driver?.memberPhoneNumber);

  return (
    <Grid item xs={6} sm={6} mg={4} lg={3} className="bio_card">
      <Card
        sx={{
          width: 320,
          maxWidth: "100%",
          boxShadow: "lg",
          border: highlight && "2px solid red",
        }}
      >
        <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
          <Avatar
            src={driver.memberImage || "/static/images/avatar/1.jpg"}
            sx={{ "--Avatar-size": "4rem" }}
          />
          <Chip
            size="sm"
            variant="soft"
            color="primary"
            sx={{
              mt: -1,
              mb: 1,
              border: "3px solid",
              borderColor: "background.surface",
            }}
          >
            {driver?.driverAndCarDTO?.driverRegion}
          </Chip>
          <Typography level="title-lg">{driver?.memberName}</Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            {driver.branchDTO ? driver.branchDTO.branchRegion : ""}
            <br />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 512 512"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            {phone}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              "& > button": { borderRadius: "2rem" },
            }}
          >
            <Tooltip title={driver?.driverAndCarDTO?.driverLicenseNumber}>
            <IconButton size="sm" variant="plain" color="neutral">
              <DirectionsCarIcon/>
            </IconButton>
            </Tooltip>
            <Tooltip title={driver?.memberEmail} variant='solid'>
            <IconButton size="sm" variant="plain" color="neutral">
              <EmailIcon/>
            </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
        <CardOverflow sx={{ bgcolor: "background.level1" }}>
          <CardActions buttonFlex="1">
            <ButtonGroup
              variant="outlined"
              sx={{ bgcolor: "background.surface" }}
            >
              <Button onClick={showBusinessCard} name={driver?.memberId}>
                Detail
              </Button>
              {role === "a" && (
                <Button
                  color="danger"
                  onClick={deleteHandler}
                  name={driver.memberId}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </CardActions>
        </CardOverflow>
      </Card>
      <DriverModifyModal
        modal={modal}
        toggle={toggle}
        driver={driver}
        form={form}
        setForm={setForm}
      />
    </Grid>
  );
}

function BusinessCard({ driver, logo, image }) {
  return (
    <div class='license-modal'>
      <div class="license-card">
        <div class="license-header">
          <img src={logo} alt="국기" />
          <Tooltip title='modify' variant='solid'>
            <IconButton className="license-modify" id='modifyButton'>
              <DrawIcon/>
            </IconButton>
          </Tooltip>
        </div>
        <div class="license-body">
          <div class="license-photo">
            <img src={image} width={"100%"} alt="이미지 없음" />
          </div>
          <div class="license-text">
            <h4>{driver.driverAndCarDTO.driverLicenseNumber}</h4>
            <ul style={{ listStyle: "none", textAlign: "left" }}>
              <li>이름 : {driver.memberName}</li>
              <li>생일 : {driver.memberBirthDate}</li>
              <li>주소 : {driver.memberAddress}</li>
              <li>핸드폰 : {driver.memberPhoneNumber}</li>
              <li>성별 : {driver.memberGender}</li>
              <li>운전지역 : {driver.driverAndCarDTO.driverRegion}</li>
              <li>입사일 : {driver.memberHireDate}</li>
            </ul>
          </div>
        </div>
      </div>
      <Button id="rightButton"><ChevronRightIcon/></Button>
    </div>
  );
}

function BusinessCardBack({car}){
  return(
    <div class='license-modal'>
      <div class="license-card-back">
        <div className="license-card-back-photo">
          <div className="car-front">
            <img src={car.carPhoto} alt="이미지 없음"/>
          </div>
          <div className="car-rear">
            <img src={car.carPhoto} alt="이미지 없음"/>
          </div>
        </div>
        <div class='license-card-back-text' style={{display : 'flex' ,alignItems : 'center'}}>
          <div><h4>{car.carNumber}</h4></div>
          <div>
            <ul style={{listStyle : 'none' , textAlign : 'left'}}>
              <li>출고일 : {car.carDate}</li>
              <li>특이사항 : {car.carEtc}</li>
            </ul>
          </div>
        </div>
      </div>
      <Button id="leftButton"><ChevronRightIcon/></Button>
    </div>
  )
}





