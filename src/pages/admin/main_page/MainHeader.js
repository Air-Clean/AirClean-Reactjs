import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListSubheader } from '@mui/material';
import './MainHeaderCss.css';
import 'animate.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { callBranchApi } from '../../../apis/MainAPICalls';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MainHeader({ com, setCom, firm, setFirm }) {
  const dispatch = useDispatch();

  const [animationClass, setAnimationClass] = useState('');

  const handleChange = (e) => {
    console.log('기업 유형', e.target.value);
    setCom(e.target.value);
  };

  const branch = useSelector((state) => state.branchReducer);

  console.log('branch 구성', branch);

  useEffect(() => {
    dispatch(callBranchApi());
  }, [dispatch]);

  useEffect(() => {
    setFirm(branch.filter((b) => b.branchCode === com).map((b) => b.branchName));

    setAnimationClass('animate__animated animate__fadeInUp');

    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 1000); 

    return () => clearTimeout(timer);
  }, [com, branch]);

  return (
    <>
      <div className={`mainHeaderBox ${animationClass}`}>
        <div className="titleBox">{!com || com === 'Total' ? 'Total' : firm}</div>
      </div>
      <div>
        <FormControl variant="standard" sx={{ m: 4, minWidth: 250 }}>
          <InputLabel
            id="demo-simple-select-standard-label"
            style={{ fontWeight: 'bold' }}
          >
            Company
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={com}
            onChange={handleChange}
            label="Company"
            MenuProps={MenuProps}
          >
            <MenuItem value="Total">Total</MenuItem>
            <ListSubheader>중앙</ListSubheader>
            {branch
              .filter((b) => b.branchRegion === '중앙')
              .map((b) => (
                <MenuItem key={b.branchCode} value={b.branchCode}>
                  {b.branchName}
                </MenuItem>
              ))}
            <ListSubheader>동부</ListSubheader>
            {branch
              .filter((b) => b.branchRegion === '동부')
              .map((b) => (
                <MenuItem key={b.branchCode} value={b.branchCode}>
                  {b.branchName}
                </MenuItem>
              ))}
            <ListSubheader>서부</ListSubheader>
            {branch
              .filter((b) => b.branchRegion === '서부')
              .map((b) => (
                <MenuItem key={b.branchCode} value={b.branchCode}>
                  {b.branchName}
                </MenuItem>
              ))}
            <ListSubheader>남부</ListSubheader>
            {branch
              .filter((b) => b.branchRegion === '남부')
              .map((b) => (
                <MenuItem key={b.branchCode} value={b.branchCode}>
                  {b.branchName}
                </MenuItem>
              ))}
            <ListSubheader>북부</ListSubheader>
            {branch
              .filter((b) => b.branchRegion === '북부')
              .map((b) => (
                <MenuItem key={b.branchCode} value={b.branchCode}>
                  {b.branchName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
