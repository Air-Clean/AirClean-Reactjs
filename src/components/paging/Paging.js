import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PagingCss from './Paging.module.css'
import Fab from '@mui/material/Fab';
export default function Paging({end,setCurrent}) {

    const handleChange=(e,value)=>{
        console.log(value)
        setCurrent(value)
    }



  return (
    <>
    <div className={PagingCss.pageDesign}>
    <Stack spacing={2}>
      <Pagination
        count={end}  // end page
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        onChange={handleChange}
      />
    </Stack>
    </div>
    </>
    
  );
}