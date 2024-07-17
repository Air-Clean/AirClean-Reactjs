import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Paging({start,end,setCurrent}) {

    const handleChange=(e,value)=>{
        console.log(value)
        setCurrent(value)
    }



  return (
    <Stack spacing={2}>
      <Pagination
        count={10}  // end page
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        onChange={handleChange}
      />
    </Stack>
  );
}