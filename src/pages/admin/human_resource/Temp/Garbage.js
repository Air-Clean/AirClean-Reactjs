import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GarbageEmp from "./GarbageEmp";
import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function GarbageResource({direction}) {
  const [value, setValue] = React.useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount ,setAmount] = useState(10);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleSelect = (item) => {
    setAmount(item); // Set the selected item

    
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: 'flex', alignItems: 'center' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="직원" {...a11yProps(0)} />
          <Tab label="지점장" {...a11yProps(1)} />
          <Tab label="차량기사" {...a11yProps(2)} />
        </Tabs>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} style={{marginLeft : 'auto'}}>
        <DropdownToggle caret>{"Sort" && amount}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Sort</DropdownItem>
          <DropdownItem onClick={() => handleSelect("10")}>10</DropdownItem>
          <DropdownItem onClick={() => handleSelect('20')}>20</DropdownItem>
          <DropdownItem onClick={() => handleSelect('30')}>30</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GarbageEmp amount={amount}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        지점장
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        차량기사
      </CustomTabPanel>
    </Box>
  );
}

GarbageResource.propTypes = {
  direction: PropTypes.string,
};



