import BioCard from "./BioCard";
import Searchbar from "./Searchbar";
import "./HumanResource.css";


import Paging from "../../../components/paging/Paging";
import { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { callEmployeeList, callSoftDeleteEmployee } from "../../../apis/HRAPICalls";
import { Grid } from "@mui/material";
import Fab from '@mui/material/Fab';




function EmployeeResource() {
  console.log("====================================직원페이지 입니다");


    const [isRegist , setIsRegist] = useState('');
    const [current , setCurrent] = useState(1);
    const [deleteMember, setDeleteMember] = useState([]);
    
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
        console.log('callEMP')
    },[current, dispatch])

    

  

    const softDeleteHandler=()=>{
        dispatch(
          callSoftDeleteEmployee({deleteMember: deleteMember})
        )
        
        window.location.reload();
    }

  return (
    <>

      <div className="menu1_layout">
        <div className="searchbar_container">
          <Searchbar setRegist={setIsRegist} isRegist={isRegist}/>
        </div>
        <Grid container spacing={1} justifyContent="flex-start" className="flex_wrap">
          {employee?.map((e) => (
              <BioCard emp={e} key={e.memberDTO.memberId} setDeleteMember={setDeleteMember} deleteMember={deleteMember}/>
          ))}
          
        </Grid>
        <div className="deleteButtonCss">
            <Fab variant="extended" onClick={softDeleteHandler}>
            {deleteMember.length} 명 삭제하기
            </Fab>
        </div>
        <Paging setCurrent={setCurrent} end={totalPage} />
        
      </div>
    </>
  );
}

export default EmployeeResource;
