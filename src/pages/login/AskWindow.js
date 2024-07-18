import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  ButtonGroup,
  FormFeedback,
} from "reactstrap";

import { useState , useEffect  } from "react";
import LoginCss from "./Login.module.css";

import { useDispatch , useSelector} from "react-redux"; 
import { callFindUserAPI } from "../../apis/MemberAPICalls";


export default function AskWindow() {
    //useState
  const [modal, setModal] = useState(false);
  const [rSelected, setRSelected] = useState(null);
  const [form, setForm] = useState({
    memberName : '',
    memberPhone : '',
    memberEmail : '',
    memberRole : '',
    askDescription : ''
  })
  const [isValid , setIsValid] = useState({})

  // redux
  const dispatch = useDispatch();

  const isSuccess = useSelector(state=> state.askReducer)

  const toggle = () => {
    setModal(!modal)

    setForm({})
    setIsValid({})
    setRSelected(null)
  };



  useEffect(()=>{

    if(isSuccess.status===500){
        window.alert("입력값이 정확하지 않습니다. 다시 입력해주세요.")
        window.location.reload();
    }
   
  },[isSuccess])
  
  const inputHandler = e=>{

    const name = e.target.name;

    const value = e.target.value;

    const changeForm = {...form,[name]:value}

    switch(name){
        case 'memberName' : 
            const isEnglish = /^[a-zA-Z]+$/.test(value);
            const isKorean = /^[가-힣]+$/.test(value);
            setIsValid({...isValid,memberName : isEnglish || isKorean})
            break;

            case 'memberPhone' : 
            
            setIsValid({...isValid,memberPhone : /^\d{10,11}$/.test(value)})
            break;

        case 'memberEmail' : 
            
            setIsValid({...isValid,memberEmail : /^[a-zA-Z0-9._%+-]+@(gmail|naver)\.(com|net|org)$/.test(value)})
            break;

        default : setIsValid({...isValid})
    }
    if(e.target.name === 'memberRole'){
        setRSelected(e.target.value)
    }
    setForm(changeForm)
  }

  const submitHandler=()=>{
    dispatch(callFindUserAPI({form}))

    setForm({})

    window.location.reload();
  }



  return (
    <>
      <p
        style={{ textAlign: "center" }}
        onClick={toggle}
        className={LoginCss.ModalButton}
      >
        문의하기
      </p>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}> ID / PASSWORD 문의 </ModalHeader>
        <ModalBody>
          <FormGroup floating>
            <Input
              id="memberName"
              name="memberName"
              placeholder="Name"
              type="text"
              autoComplete="off"
              onChange={inputHandler}
              invalid={!isValid.memberName}
              valid={isValid.memberName}
            />
            <FormFeedback inValid>
                이름은 한글 또는 알파벳이어야 합니다
            </FormFeedback>
            <Label for="memberName">Name</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="memberPhone"
              name="memberPhone"
              placeholder="phone"
              type="text"
              autoComplete="off"
              onChange={inputHandler}
              invalid={!isValid.memberPhone}
              valid={isValid.memberPhone}
            />
            <FormFeedback inValid>
                숫자만 입력하세요
            </FormFeedback>
            <Label for="memberPhone">Phone</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="memberEmail"
              name="memberEmail"
              placeholder="Email"
              type="email"
              autoComplete="off"
              onChange={inputHandler}
              invalid={!isValid.memberEmail}
              valid={isValid.memberEmail}
            />
            <FormFeedback inValid>
                Email 을 작성해주세요
            </FormFeedback>
            <Label for="exampleEmail">Email</Label>
          </FormGroup>
          <ButtonGroup className="my-2" size="m" style={{ width: "100%" }} onClick={inputHandler}>
            <Button outline value='e' name='memberRole' active={rSelected === 'e'}>직원</Button>
            <Button outline value='b' name='memberRole'  active={rSelected === 'b'}>지점장</Button>
          </ButtonGroup>
          <FormGroup floating>
            <Input
              id="askDescription"
              name="askDescription"
              placeholder="Description"
              type="textarea"
              autoComplete="off"
              onChange={inputHandler}
            />
            <Label for="askDescription">Description</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitHandler} >
            문의하기
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
