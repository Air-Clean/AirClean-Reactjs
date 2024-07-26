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
import axios from 'axios';

export default function BranchModal({ show, onClose, onSubmit }) {
  const [form, setForm] = useState({
    branchCode: "",
    branchRegion: "",
    branchName: "",
    branchPhone: "",
    branchAddress: "",
    branchImage: null,
    branchOpenDate: "",
    memberId: ""
  });

  const [postcodeVisible, setPostcodeVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setForm({
        branchCode: "",
        branchRegion: "",
        branchName: "",
        branchPhone: "",
        branchAddress: "",
        branchImage: null,
        branchOpenDate: "",
        memberId: ""
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("branchCode", form.branchCode || '');
    formData.append("branchRegion", form.branchRegion || '');
    formData.append("branchName", form.branchName || '');
    formData.append("branchPhone", form.branchPhone || '');
    formData.append("branchAddress", form.branchAddress || '');
    formData.append("branchImageFile", form.branchImage || new Blob()); // 빈 Blob 객체를 기본값으로 사용
    formData.append("branchOpenDate", form.branchOpenDate || '');
    formData.append("memberId", form.memberId || '');

    try {
        const token = window.localStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:3000/branch/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token
            }
        });

        console.log('서버 응답:', response.data);

        onSubmit(response.data); // 필요한 경우 응답 결과를 상위 컴포넌트로 전달
        onClose();
    } catch (error) {
        console.error('에러 발생:', error);
        if (error.response && error.response.data) {
            console.error('서버 응답 오류 메시지:', error.response.data.message);
        }
    }
};

  return (
    <Modal isOpen={show} toggle={onClose} centered className="custom-modal">
      <ModalHeader toggle={onClose}>지점 등록</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="branchCode">지점 코드</Label>
              <Input
                type="text"
                name="branchCode"
                id="branchCode"
                value={form.branchCode}
                onChange={inputHandler}
                placeholder="지점 코드를 입력해주세요"
              />
            </FormGroup>
            <FormGroup>
              <Label for="branchRegion">지점 지역</Label>
              <Input
                type="text"
                name="branchRegion"
                id="branchRegion"
                value={form.branchRegion}
                onChange={inputHandler}
                placeholder="지점 지역을 입력해주세요"
              />
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
                    <DaumPostcodeEmbed onComplete={handleAddressSelect} style={{ height: "400px" }} />
                  </CardBody>
                </Card>
              )}
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
                type="text"
                name="memberId"
                id="memberId"
                value={form.memberId}
                onChange={inputHandler}
                placeholder="회원 ID를 입력해주세요"
              />
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
