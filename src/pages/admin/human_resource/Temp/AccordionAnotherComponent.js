import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import "./AccordionComponent.css";
import { getPhoneNumber } from "../../../../utils/makePhoneNumber";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function AccordionAnotherComponent({
  emp,
  killMember,
  setKillMember,
  saveMember,
  setSaveMember,
  isDelete,
  isSave,
}) {
  console.log("accorion emp", emp);
//   console.log("dslkjdslkdsjf", emp.memberDTO.memberId);
  const [expanded, setExpanded] = useState(null);
  const [canSave, setCanSave] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  const [deleteChecked, setDeleteChecked] = useState(false);

//   const image = emp.memberDTO.memberImage.split("/")[4];
//   const phone = getPhoneNumber(emp.memberDTO.memberPhoneNumber);

  // Handle delete button click
  const handleDeleteClick = (e) => {
    e.stopPropagation();

    const changeDelete = toggleValue([...killMember], e.currentTarget.name);

    setKillMember(changeDelete);

    setCanDelete(!canDelete);

    console.log("Delete clicked");
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

  // Handle rotate button click
  const handleRotateClick = (e) => {
    e.stopPropagation();

    setCanSave(!canSave);
    const changeSave = toggleValue([...saveMember], e.currentTarget.name);

    setSaveMember(changeSave);

    console.log("Rotate clicked");
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className="mt-2"
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem", // Space between checkbox and profile/avatar
              width: "100%", // Ensures the container takes full width
            }}
            onClick={(e) => e.stopPropagation()} // Prevents accordion toggle on this area
          >
            {/* Avatar and Name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10%",
                width: "10vw",
              }}
            >
              {/* <Avatar src={image ? emp.memberDTO.memberImage : "profile"} /> */}
              {/* <div>{emp.memberDTO.memberName}</div> */}
            </div>
            <div>{emp.employeeDept}</div>
            <div>{emp.employeePosition}</div>

            {/* Buttons aligned to the right */}
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: "1px",
              }}
            >
              <Tooltip title="Delete">
                <IconButton
                  disabled={isSave}
                  onClick={handleDeleteClick}
                //   name={emp.memberDTO.memberId}
                >
                  <Avatar style={{ backgroundColor: canDelete && "red" }}>
                  <DeleteIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Tooltip title='RollBack'>
                <IconButton
                  disabled={isDelete}
                  onClick={handleRotateClick}
                //   name={emp.memberDTO.memberId}
                >
                  <Avatar style={{ backgroundColor: canSave && "blue" }}>
                  <RotateLeftIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="info-container">
              <div className="info-group left">
                <div className="info-item">
                  <strong>Name : </strong>{" "}
                  {/* <span>{emp.memberDTO.memberName}</span> */}
                </div>
                <div className="info-item">
                  {/* <strong>ID : </strong> <span>{emp.memberDTO.memberId}</span> */}
                </div>
                <div className="info-item">
                  <strong>Position :</strong>{" "}
                  <span>{emp.employeePosition}</span>
                </div>
                <div className="info-item">
                  <strong>Department :</strong> <span>{emp.employeeDept}</span>
                </div>
              </div>
              <div className="info-group right">
                <div className="info-item">
                  <strong>E-mail :</strong>{" "}
                  {/* <span>{emp.memberDTO.memberEmail}</span> */}
                </div>
                <div className="info-item">
                  {/* <strong>Phone :</strong> <span>{phone}</span> */}
                </div>
                <div className="info-item">
                  <strong>Address : </strong>{" "}
                  {/* <span>{emp.memberDTO.memberAddress}</span> */}
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionAnotherComponent;
