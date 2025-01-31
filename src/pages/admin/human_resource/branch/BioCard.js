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
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import "animate.css";
import "./BioCard.css";
import logo from "../../../../assets/logo2.png";
import noProfile from "../../../../assets/no-profile.png";
import BranchModifyModal from "./BranchModifyModal";
import { getPhoneNumber } from "../../../../utils/makePhoneNumber";
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import GiteIcon from '@mui/icons-material/Gite';
import EmailIcon from '@mui/icons-material/Email';
import ReactDOMServer from 'react-dom/server'
import ReactDOM from "react-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/joy/Tooltip';
import DrawIcon from '@mui/icons-material/Draw';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


export default function BioCard({ branch, setDeleteMember, deleteMember , setCopy,handleClick }) {
  console.log("biocard=============================");
  console.log('branch',branch)

  const members = jwtDecode(window.localStorage.getItem('accessToken'));

  console.log('members biocard',members)
      let image =branch?.memberDTO?.memberImage;

    console.log(image?.split('/')[4])

    console.log('image anjsi',image);
  
    if(image?.split('/')[4]==='null'){
      image = noProfile;
    }

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');

        setCopy(text)
        handleClick({vertical : "top", horizontal : 'left'});

      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    };

  function showBusinessCard() {
    const businessCardHtml = ReactDOMServer.renderToString(
      <BusinessCard branch={branch} logo={logo} image={image} members={members}/>
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
            branch={branch}
            logo={logo}
            image={image}
            members={members}
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
          <BusinessCardBack branch={branch} logo={logo}/>,
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
      memberId: branch?.memberDTO?.memberId,
      memberName: branch?.memberDTO?.memberName,
      isPass: false,
      phone: branch?.memberDTO?.memberPhoneNumber,
      branchPhone : branch?.branchPhone,
      email: branch?.memberDTO?.memberEmail,
      address: branch?.memberDTO?.memberAddress,
      image: null,
      imagePreview: branch?.memberDTO?.memberImage,
      
    });


    const toggle = () => {
      console.log("수정버튼");
      setModal(!modal);

      setForm({
        memberId: branch?.memberDTO?.memberId,
        memberName: branch?.memberDTO?.memberName,
        isPass: false,
        phone: branch?.memberDTO?.memberPhoneNumber,
        branchPhone : branch?.branchPhone,
        email: branch?.memberDTO?.memberEmail,
        address: branch?.memberDTO?.memberAddress,
        image: null,
        imagePreview: branch?.memberDTO?.memberImage,
        
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
    const phone = getPhoneNumber(branch?.memberDTO?.memberPhoneNumber)

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
            <Avatar src={branch?.memberDTO?.memberImage || "/static/images/avatar/1.jpg"} sx={{ '--Avatar-size': '4rem' }} />
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
              {branch?.branchDTO ? branch?.branchDTO?.branchName : 'no site'}
            </Chip>
            <Typography level="title-lg">{branch?.memberDTO?.memberName}</Typography>
            <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
              {branch?.branchDTO ? branch?.branchDTO?.branchRegion : ''} 
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
              <Tooltip title={branch?.memberDTO?.memberPhoneNumber}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() =>
                  copyToClipboard(branch?.memberDTO?.memberPhoneNumber)
                }
              >
                <LocalPhoneIcon/>
              </IconButton>
            </Tooltip>
              <Tooltip title={branch?.memberDTO?.memberEmail}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() =>
                  copyToClipboard(branch?.memberDTO?.memberEmail)
                }
              >
                <EmailIcon/>
              </IconButton>
            </Tooltip>

            {branch?.branchDTO ? 
           <Tooltip title={branch?.branchDTO?.branchPhone}>
           <IconButton
             size="sm"
             variant="plain"
             color="neutral"
             onClick={() =>
               copyToClipboard(branch?.branchDTO?.branchPhone)
             }
           >
             <LocalLaundryServiceIcon/>
           </IconButton>
         </Tooltip> : '' }
            </Box>
          </CardContent>
          <CardOverflow sx={{ bgcolor: "background.level1" }}>
            <CardActions buttonFlex="1">
              <ButtonGroup
                variant="outlined"
                sx={{ bgcolor: "background.surface" }}
              >
                <Button onClick={showBusinessCard} name={branch?.memberDTO?.memberId}>Detail</Button>
                {role==='a' && <Button color='danger' onClick={deleteHandler} name={branch?.memberDTO?.memberId}>Delete</Button>}
              </ButtonGroup>
            </CardActions>
          </CardOverflow>
        </Card>
        <BranchModifyModal modal={modal} toggle={toggle} branch={branch} form={form} setForm={setForm}/>
      </Grid>
    );
  }


  function BusinessCard({ members, branch, logo, image}) {

    console.log('앞장 members',members)
    return (
      <div className="hr-branch-modal">
        <div className="business-card">
            <img src={logo} alt="이미지 없음" className="top-text" />
            <div className="content">
                <img src={image} alt="사진 없음" className="profile" />
                <div className="name">{branch?.memberDTO?.memberName}</div>
                <div className="handle">{branch?.branchDTO ? branch?.branchDTO?.branchName : 'no site'}</div>
                <div className="contact-info">
                    <div>
                        {branch?.branchDTO ? branch?.branchDTO?.branchRegion : ''}
                    </div>
                    <div>{branch?.memberDTO?.memberId}</div>
                    <hr />
                    <div>

                      
                      <div style={{ display : 'flex' , justifyContent : 'space-evenly'}}>
                        <StayCurrentPortraitIcon/>
                        {getPhoneNumber(branch?.memberDTO?.memberPhoneNumber)}
                      </div>
                    </div>
                    <div>
                      <div style={{ display : 'flex' , justifyContent : 'space-evenly'}}>
                        <EmailIcon/>
                        {branch?.memberDTO?.memberEmail}
                      </div>
                    </div>
                    <div>
                      <div>
                        <GiteIcon/>
                        {branch?.memberDTO?.memberAddress}
                      </div>
                    </div>
                </div>                
            </div>
            <div style={{display : 'flex' , alignSelf : 'flex-end'}}>
            {(members?.memberRole === 'a' || members?.sub === branch?.memberDTO?.memberId) &&
            <Tooltip title='modify' variant='solid'>
            <IconButton className="license-modify" id='modifyButton'>
              <DrawIcon/>
            </IconButton>
              </Tooltip>
              }
            </div>
  
        </div>
        <Button id='rightButton'><KeyboardArrowDownIcon/></Button>
        </div>
    );
}

function BusinessCardBack({logo,branch}){

  console.log('back branch',branch)
  return(


    <div className="hr-branch-modal">
        <div className="business-card">
            <img src={logo} alt="이미지 없음" className="top-text" />
            <div className="content">
                <img src={branch.branchDTO.branchImage} alt="이미지 없음" width={'100%'} height={'30%'}/>
                <div className="name">{branch.branchDTO.branchName}</div>
                <div className="handle">{branch.branchDTO.branchRegion}</div>
                <div className="contact-info">
                    <div>
                        {/* {branch.branchDTO ? branch.branchDTO.branchRegion : ''} */}
                    </div>
                    {/* <div>{branch.memberDTO.memberId}</div> */}
                    <hr />
                    <div>

                      {branch.branchDTO ? 
                      <div>
                        <LocalLaundryServiceIcon/>
                        {getPhoneNumber(branch.branchDTO.branchPhone)}
                      </div>
                            
                       : ''}
                    </div>
                    <div>
                    </div>
                    <div>
                      <div>
                        <GiteIcon/>
                        {branch.branchDTO.branchAddress}
                      </div>
                    </div>
                </div>
                {/* {(members.memberRole === 'a' || members.sub === branch.memberDTO.memberId) &&
                <div className="modifybutton">
                  <button className="button-19" id="modifyButton">Modify</button>
                </div>
                }  */}
                
            </div>
        </div>
        <Button id='leftButton'><KeyboardArrowDownIcon/></Button>

        </div>
  )
}

