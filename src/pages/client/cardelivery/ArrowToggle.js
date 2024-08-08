import { useState } from "react";
import Button from '@mui/material/Button';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function ArrowToggle({isFoward , setIsFoward}){

    const toggleArrow = () =>{
        setIsFoward(!isFoward)
    }

    return(
        <Button onClick={toggleArrow} variant="outlined">
            Client {isFoward ? <KeyboardDoubleArrowLeftIcon/> : <KeyboardDoubleArrowRightIcon/> } Branch
        </Button>
    )
}