import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Col,
  Card,
  CardBody,
  Row,
} from "reactstrap";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DaumPostcodeEmbed from "react-daum-postcode";
import styles from './BranchModal.module.css';
import { registManager } from "../../apis/CallBranchInfoApi";
import { useDispatch } from "react-redux";

const seoulAreas = {
  중앙: ['종로구', '중구', '용산구','마포구','영등포구'],
  동부: ['동대문구', '성동구', '광진구', '중랑구'],
  서부: ['서대문구',  '은평구', '강서구', '양천구','동작구'],
  남부: ['강남구', '서초구',  '관악구', '송파구', '강동구'],
  북부: ['성북구', '강북구', '도봉구', '노원구'],
};

// 주소를 구역으로 분류하는 함수
const classifyAddress = (address, areas) => {
  for (const [area, districts] of Object.entries(areas)) {
    if (districts.some(district => address.includes(district))) {
      return area;
    }
  }
  return '알 수 없음';
};

export default function BranchModal({ show, onClose, onSubmit, man }) {
  const [form, setForm] = useState({
    branchName: "",
    branchPhone: "",
    branchAddress: "",
    branchImage: null,
    branchOpenDate: "",
    memberId: "",
  });

  const [postcodeVisible, setPostcodeVisible] = useState(false);
  

  useEffect(() => {
    if (show) {
      setForm({
        branchName: "",
        branchPhone: "",
        branchAddress: "",
        branchImage: null,
        branchOpenDate: "",
        memberId: "",
      });
    }
  }, [show]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setForm((prevForm) => ({
      ...prevForm,
      branchImage: file
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    }
  });

  const handleAddressSelect = (data) => {
    const fullAddress = data.address;
    setForm((prevForm) => ({
      ...prevForm,
      branchAddress: fullAddress
    }));
    setPostcodeVisible(false);
  };

  const handleAddressClick = () => {
    setPostcodeVisible(!postcodeVisible);
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("branchName", form.branchName);
    formData.append("branchPhone", form.branchPhone );
    formData.append("branchAddress", form.branchAddress );
    formData.append("branchOpenDate", form.branchOpenDate );
    formData.append("memberId", form.memberId);

    if(form.branchImage){
      formData.append("image",form.branchImage)
    }

    

    const classifyArea = classifyAddress(form.branchAddress,seoulAreas);
    formData.append("branchRegion", classifyArea);

    dispatch(registManager({form : formData}));

    window.location.reload();

  };

  

  return (
    <Modal isOpen={show} toggle={onClose} centered className="custom-modal">
      <ModalHeader toggle={onClose}>지점 등록</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>

          <FormGroup>
              <Label for="branchAddress">주소</Label>
              <Input
                type="text"
                name="branchAddress"
                id="branchAddress"
                value={form.branchAddress}
                onClick={handleAddressClick}
                readOnly
              />
              {postcodeVisible && (
                <Card>
                  <CardBody>
                    <DaumPostcodeEmbed onComplete={handleAddressSelect} style={{ height: "200px" }} />
                  </CardBody>
                </Card>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="branchName">지점명</Label>
              <Input
                type="text"
                name="branchName"
                id="branchName"
                value={form.branchName}
                onChange={inputHandler}
                placeholder="지점명을 입력해주세요"
              />
            </FormGroup>
            <FormGroup>
              <Label for="branchPhone">연락처</Label>
              <Input
                type="text"
                name="branchPhone"
                id="branchPhone"
                value={form.branchPhone}
                onChange={inputHandler}
                placeholder="연락처를 입력해주세요"
              />
            </FormGroup>
            
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="branchOpenDate">개업일</Label>
              <Input
                type="date"
                name="branchOpenDate"
                id="branchOpenDate"
                value={form.branchOpenDate}
                onChange={inputHandler}
              />
            </FormGroup>
            <FormGroup>
            <Label for="memberId">회원 ID</Label>
              <Input
                type="select"
                name="memberId"
                id="memberId"
                value={form.memberId}
                onChange={inputHandler}
              >
                <option value="">회원 선택</option>
                {man.length > 0 && man.map((member) => (
                  <option key={member.memberId} value={member.memberId}>
                    {member.memberName} ({member.memberId})
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="branchImage">사진</Label>
              <div {...getRootProps({ className: styles.dropzone })} style={{ border: "2px dashed #ccc", padding: "10px", textAlign: "center" }}>
                <input {...getInputProps()} />
                {form.branchImage ? (
                  <img src={URL.createObjectURL(form.branchImage)} alt="Preview" style={{ width: "100%", height: "auto" }} />
                ) : (
                  <p>사진을 드래그 앤 드롭하거나 클릭하여 업로드하세요.</p>
                )}
              </div>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          등록
        </Button>
        <Button color="secondary" onClick={onClose}>
          닫기
        </Button>
      </ModalFooter>
    </Modal>
  );
}
