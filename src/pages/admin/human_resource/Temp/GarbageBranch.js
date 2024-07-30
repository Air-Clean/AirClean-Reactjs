import AccordionAnotherComponent from "./AccordionAnotherComponent";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { softDeleteBranch } from "../../../../apis/HRAPICalls";
import Paging from "../../../../components/paging/Paging";
import './GarbageEmp.css'
import 'animate.css';
import { callBranchDeleteApi ,callBranchBackApi } from "../../../../apis/HRAPICalls";


export default function GarbageEmp({amount}) {
  const [current, setCurrent] = useState(1);

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isSaveVisible, setIsSaveVisible] = useState(false);
  
  const [animationClass, setAnimationClass] = useState('animate__animated animate__fadeInUp');

  const [killMember ,setKillMember] = useState([]);
  const [saveMember, setSaveMember] = useState([]);
  const [isDelete , setIsDelete] = useState(false);
  const [isSave,setIsSave] = useState(false);
  


  const dispatch = useDispatch();

  const branch = useSelector((state) => state.humanReducer);

  console.log("N 직원 찾기", branch);

  const deleteHandler=()=>{
    
    console.log('삭제버튼')

    dispatch(callBranchDeleteApi({killMember}));
    

    window.location.reload();
  }

  const saveHandler=()=>{
    console.log('살려줘')

    dispatch(callBranchBackApi({saveMember}))
    window.location.reload();
  }

  useEffect(() => {

    console.log("renderinng");

    dispatch(softDeleteBranch({ current, amount }));

  }, [current, dispatch, amount]);

  useEffect(() => {
    if (killMember.length > 0) {
      setAnimationClass('animate__animated animate__fadeInUp');
      setIsButtonVisible(true);
    } else if (killMember.length === 0 && isButtonVisible) {
      setAnimationClass('animate__animated animate__fadeOutDown');
      setTimeout(() => setIsButtonVisible(false), 1000); // 애니메이션 시간 후에 버튼 숨기기
    }
    console.log("killMember 변함", killMember);
  }, [killMember, isButtonVisible]);


  useEffect(() => {
    if (saveMember.length > 0) {
      setAnimationClass('animate__animated animate__fadeInUp');
      setIsSaveVisible(true);
    } else if (saveMember.length === 0 && isSaveVisible) {
      setAnimationClass('animate__animated animate__fadeOutDown');
      setTimeout(() => setIsSaveVisible(false), 1000); // 애니메이션 시간 후에 버튼 숨기기
    }
    console.log("saveMember 변함", saveMember);

  }, [saveMember, isSaveVisible]);

 

  if (!branch || !branch.data || !branch.data.content) {
    // Display a loading message or spinner
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {branch.data.content.length > 0 ? (
          branch.data.content.map((emp) => (
            <AccordionAnotherComponent emp={emp} killMember={killMember} setKillMember={setKillMember}  isDelete={isDelete} isSave={isSave} />
          ))
        ) : (
          <div>No employees found.</div>
        )}

        {isButtonVisible && (
          <div className={`deleteButtonCss ${animationClass}`}>
            <button className="button-45" onClick={deleteHandler}>
              {killMember.length} 명을 삭제하시겠습니까?
            </button>
          </div>
        )}

        {isSaveVisible && (
          <div className={`deleteButtonCss ${animationClass}`}>
            <button className="button-46" onClick={saveHandler}>
              {saveMember.length} 명을 되돌리시겠습니까?
            </button>
          </div>
        )}

        <Paging setCurrent={setCurrent} end={branch.data.totalPages}/>
      </div>
      
    </>
  );
}
