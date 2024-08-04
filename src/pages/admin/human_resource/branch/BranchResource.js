import BioCard from "./BioCard";
import Searchbar from "../Searchbar";
import "../HumanResource.css"


import Paging from "../../../../components/paging/Paging";
import { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { callBranchList, callSoftDeleteBranch } from "../../../../apis/HRAPICalls";
import { Grid } from "@mui/material";
import 'animate.css';



export default function BranchResource() {
  console.log("====================================지점장페이지 입니다");


    const [isRegist , setIsRegist] = useState('');
    const [current , setCurrent] = useState(1);
    const [deleteMember, setDeleteMember] = useState([]);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [animationClass, setAnimationClass] = useState('animate__animated animate__fadeInUp');
    
    // redux

    const dispatch = useDispatch();

    const result = useSelector(state=>state.humanReducer);

    const branch = result?.data?.content;
    const totalPage = result?.data?.totalPages;

    

    console.log("branch",branch)
    console.log("result 값",result)


    useEffect(()=>{
        dispatch(
            callBranchList({current : current})
        )
    },[current, dispatch])

    useEffect(() => {
      if (deleteMember?.length > 0) {
        setAnimationClass('animate__animated animate__fadeInUp');
        setIsButtonVisible(true);
      } else if (deleteMember?.length === 0 && isButtonVisible) {
        setAnimationClass('animate__animated animate__fadeOutDown');
        setTimeout(() => setIsButtonVisible(false), 1000); // 애니메이션 시간 후에 버튼 숨기기
      }
      console.log("deleteMember 변함", deleteMember);
    }, [deleteMember, isButtonVisible]);
  

    const softDeleteHandler=()=>{
        dispatch(
            callSoftDeleteBranch({deleteMember: deleteMember})
        )
        
        window.location.reload();
    }

  return (
    <>

      <div className="menu1_layout">
       <div className="flex_wrap">
        <div className="searchbar_container">
          <Searchbar setRegist={setIsRegist} isRegist={isRegist} />
        </div>
        <Grid container spacing={1} justifyContent="flex-start">
          {branch?.map((b) => (
              <BioCard branch={b} key={b?.memberDTO?.memberId} setDeleteMember={setDeleteMember} deleteMember={deleteMember}/>
          ))}
          {isButtonVisible && (
          <div className={`deleteButtonCss ${animationClass}`}>
            <button className="button-45" onClick={softDeleteHandler}>
              {deleteMember?.length} 명을 삭제하시겠습니까?
            </button>
          </div>
        )}
        </Grid>
        
        
          <Paging setCurrent={setCurrent} end={totalPage} />
        </div>
      </div>
    </>
  );
}


