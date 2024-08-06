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
import { Grid } from "@mui/material";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import "animate.css";
import "./BioCard.css";
import logo from "../../../../assets/logo2.png";
import noProfile from "../../../../assets/no-profile.png";
import EmployeeModifyModal from "./EmployeeModifyModal";
import { getPhoneNumber } from "../../../../utils/makePhoneNumber";
import ReactDOMServer from "react-dom/server";
import Tooltip from "@mui/joy/Tooltip";
import DrawIcon from "@mui/icons-material/Draw";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

export default function BioCard({
  emp,
  setDeleteMember,
  deleteMember,
  setCopy,
  handleClick,
}) {
  console.log("biocard=============================");

  console.log('emp 호긴',emp)
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");

        setCopy(text);
        handleClick({ vertical: "top", horizontal: "left" });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  function showBusinessCard() {
    let image = emp?.memberDTO?.memberImage;
    console.log(image?.split("/")[4]);
    console.log("image anjsi", image);

    if (image?.split("/")[4] === "null") {
      image = noProfile;
    }

    const businessCardHtml = ReactDOMServer.renderToString(
      <BusinessCard
        logo={logo}
        image={image}
        emp={emp}
        phone={phone}
        members={members}
      />
    );

    Swal.fire({
      showClass: {
        popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `,
      },
      hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `,
      },
      html: businessCardHtml,
      width: "auto",
      padding: "10px",
      background: "transparent", // 배경 제거
      customClass: {
        container: "swal2-container",
      },
      showConfirmButton: false,
      didRender: () => {
        //     // Swal.fire가 렌더링 된 후에 이벤트 리스너를 추가합니다.
        if (document.getElementById("modifyButton")) {
          document
            .getElementById("modifyButton")
            .addEventListener("click", toggle);
        }
      },
    });
  }

  const [highlight, setHighlight] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    memberId: emp?.memberDTO?.memberId,
    memberName: emp?.memberDTO?.memberName,
    dept: emp?.employeeDept,
    position: emp?.employeePosition,
    isPass: false,
    phone: emp?.memberDTO?.memberPhoneNumber,
    email: emp?.memberDTO?.memberEmail,
    address: emp?.memberDTO?.memberAddress,
    image: null,
    imagePreview: emp?.memberDTO?.memberImage,
  });

  const members = jwtDecode(window.localStorage.getItem("accessToken"));

  const toggle = () => {
    console.log("수정버튼");
    setModal(!modal);
    setForm({
      memberId: emp?.memberDTO?.memberId,
      memberName: emp?.memberDTO?.memberName,
      dept: emp?.employeeDept,
      position: emp?.employeePosition,
      isPass: false,
      phone: emp?.memberDTO?.memberPhoneNumber,
      email: emp?.memberDTO?.memberEmail,
      address: emp?.memberDTO?.memberAddress,
      image: null,
      imagePreview: emp?.memberDTO?.memberImage,
    });
    Swal.close();
  };
  const role = members?.memberRole;

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
  const phone = getPhoneNumber(emp?.memberDTO?.memberPhoneNumber);

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
            src={emp?.memberDTO?.memberImage || "/static/images/avatar/1.jpg"}
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
            {emp?.employeePosition}
          </Chip>
          <Typography level="title-lg">{emp?.memberDTO?.memberName}</Typography>
          <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
            {emp?.employeeDept}
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

            <Tooltip title={emp?.memberDTO?.memberPhoneNumber}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() =>
                  copyToClipboard(emp?.memberDTO?.memberPhoneNumber)
                }
              >
                <LocalPhoneIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title={emp?.memberDTO?.memberEmail}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() =>
                  copyToClipboard(emp?.memberDTO?.memberEmail)
                }
              >
                <EmailIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title={emp?.memberDTO?.memberAddress}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() =>
                  copyToClipboard(emp?.memberDTO?.memberAddress)
                }
              >
                <HomeIcon/>
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
              <Button
                onClick={showBusinessCard}
                name={emp?.memberDTO?.memberId}
              >
                Detail
              </Button>
              {role === "a" && (
                <Button
                  color="danger"
                  onClick={deleteHandler}
                  name={emp?.memberDTO?.memberId}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </CardActions>
        </CardOverflow>
      </Card>
      <EmployeeModifyModal
        modal={modal}
        toggle={toggle}
        emp={emp}
        form={form}
        setForm={setForm}
      />
    </Grid>
  );
}

function BusinessCard({ members, emp, logo, image, phone }) {
  return (
    <>
      <div class="business-card">
        <img src={logo} alt="이미지 없음" class="top-text" />
        <div class="content">
          <img src={image} alt="사진 없음" class="profile" />
          <div class="name">{emp?.memberDTO?.memberName}</div>
          <div class="handle">{emp?.employeePosition}</div>
          <div class="contact-info">
            <div>{emp?.employeeDept}</div>
            <div>{emp?.memberDTO?.memberId}</div>
            <hr />
            <div>{phone}</div>
            <div>{emp?.memberDTO?.memberEmail}</div>
            <div>{emp?.memberDTO?.memberAddress}</div>
          </div>
          {/* {(members?.memberRole === 'a' || members?.sub === emp?.memberDTO?.memberId) &&
            <div class="modifybutton">
              <button class="button-19" id="modifyButton">Modify</button>
            </div>
            } */}
        </div>
        <div style={{ display: "flex", alignSelf: "flex-end" }}>
          {(members?.memberRole === "a" ||
            members?.sub === emp?.memberDTO?.memberId) && (
            <Tooltip title="modify" variant="solid">
              <IconButton className="license-modify" id="modifyButton">
                <DrawIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
}
