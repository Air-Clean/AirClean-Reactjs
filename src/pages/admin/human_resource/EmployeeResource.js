import BioCard from "./BioCard";
import Searchbar from "./Searchbar";
import "./HumanResource.css";

import { EMPLOYEE } from "../../../modules/HRModule";
import Paging from "../../../components/paging/Paging";
import { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { callEmployeeList } from "../../../apis/HRAPICalls";
import { Grid, Container } from "@mui/material";

function EmployeeResource() {
  console.log("직원페이지 입니다");



    const [current , setCurrent] = useState(1)
    

    // redux

    const dispatch = useDispatch();

    const result = useSelector(state=>state.humanReducer);

    const employee = result.data?.content;
    const totalPage = result.data?.totalPages;

    console.log("employee",employee)
    console.log("result 값",result)

    useEffect(()=>{
        dispatch(
            callEmployeeList({current : current})
        )
    },[current])
  return (
    <>

      <div className="menu1_layout">
        <div className="searchbar_container">
          <Searchbar />
        </div>
        <Grid container spacing={1} justifyContent="flex-start" className="flex_wrap">
          {employee?.map((e) => (
            <Grid item xs={6} sm={6} mg={4} lg={3} className="bio_card" key={e.memberDTO.memberId}>
              <BioCard emp={e} key={e.memberDTO.memberId}/>
            </Grid>
          ))}
          
        </Grid>
        <Paging setCurrent={setCurrent} end={totalPage} />
      </div>
    </>
  );
}

export default EmployeeResource;
