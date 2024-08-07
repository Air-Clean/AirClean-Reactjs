import React, { useEffect, useState } from 'react';
import { callNewBranchSalesAPI } from "../../../../apis/ReportAPICalls";
import { useDispatch } from "react-redux";
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
  Row
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import './Modal.css'; // 올바른 경로로 수정

// 매출보고서 모달
function BranchSalesModal({ show, onClose }) {
  const dispatch = useDispatch();

  // 제출일 오늘 이전 날짜 선택 못하게 설정
  const [minDate, setMinDate] = useState('');
  // 토큰으로 지점명, 지점장 자동 입력
  const branch = JSON.parse(window.localStorage.getItem('branch'));
  const member = jwt_decode(window.localStorage.getItem('accessToken'));
  console.log(branch);
  console.log(member);

  // form 
  const [form, setForm] = useState({
    branchReportStatus: 'N',
    branchSubmissionDate: '',
    officeSales: '',
    detergent: '',
    fabricSoftener: '',
    bleach: '',
    stainRemover: '',
    washerCleaner: '',
    dryerSheet: '',
    totalBranchSalesCost: '',
    branchName: branch.branchName,
    memberName: member.memberName,
    branchCode: branch.branchCode,
    branchSalesRemark: ''
  });

  // 금액 입력 
  const [totalCost, setTotalCost] = useState(0);

  // 쉼표 추가 함수
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  }

  useEffect(() => {
    setForm({
      branchReportStatus: 'N',
      branchSubmissionDate: '',
      officeSales: '',
      detergent: '',
      fabricSoftener: '',
      bleach: '',
      stainRemover: '',
      washerCleaner: '',
      dryerSheet: '',
      totalBranchSalesCost: '',
      branchName: branch.branchName,
      memberName: member.memberName,
      branchCode: branch.branchCode,
      branchSalesRemark: ''
    });
  }, [show, branch.branchName, member.memberName, branch.branchCode]);

  // 금액 
  useEffect(() => {
    const calculateTotalSales = () => {
      const total =
        (parseFloat(form.officeSales.replace(/,/g, '')) || 0) +
        (parseFloat(form.detergent.replace(/,/g, '')) || 0) +
        (parseFloat(form.fabricSoftener.replace(/,/g, '')) || 0) +
        (parseFloat(form.bleach.replace(/,/g, '')) || 0) +
        (parseFloat(form.stainRemover.replace(/,/g, '')) || 0) +
        (parseFloat(form.washerCleaner.replace(/,/g, '')) || 0) +
        (parseFloat(form.dryerSheet.replace(/,/g, '')) || 0);
      setTotalCost(total);
    };
    calculateTotalSales();
  }, [form]);

  // 날짜 선택
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
  }, []);

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: id === 'branchSalesRemark' ? value : value.replace(/,/g, '') // 쉼표 제거
    }));
  }

  const handleSubmit = () => {
    const data = {
      ...form,
      totalBranchSalesCost: totalCost,
    };

    dispatch(callNewBranchSalesAPI(data));
    alert('등록이 완료되었습니다');
    onClose();
  }

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      centered
      className="animate__animated animate__fadeInLeftBig custom-modal"
    >
      <ModalHeader toggle={onClose}>매출 보고서</ModalHeader>
      <ModalBody>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="branchName">지점명</Label>
              <Input
                type='text'
                id="branchName"
                value={form.branchName}
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="memberName">지점장명</Label>
              <Input
                type='text'
                id="memberName"
                value={form.memberName}
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="officeSales">일 매출</Label>
              <Input
                type='text'
                id="officeSales"
                placeholder='일매출을 입력해주세요'
                value={addComma(form.officeSales) || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="detergent">세제</Label>
              <Input
                type='text'
                id="detergent"
                placeholder='오늘의 세제 매출을 입력해주세요'
                value={addComma(form.detergent) || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="fabricSoftener">섬유유연제</Label>
              <Input
                type='text'
                id="fabricSoftener"
                placeholder='오늘의 섬유유연제 매출을 입력해주세요'
                value={addComma(form.fabricSoftener) || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="bleach">표백제</Label>
              <Input
                type='text'
                id="bleach"
                placeholder='오늘의 표백제 매출을 입력해주세요'
                value={addComma(form.bleach) || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="stainRemover">얼룩제거제</Label>
              <Input
                type='text'
                id="stainRemover"
                placeholder='오늘의 얼룩제거제 매출을 입력해주세요'
                value={addComma(form.stainRemover) || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="washerCleaner">세탁조 클리너</Label>
              <Input
                type='text'
                id="washerCleaner"
                placeholder='오늘의 세탁조클리너 매출을 입력해주세요'
                value={addComma(form.washerCleaner) || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="dryerSheet">건조기 시트</Label>
              <Input
                type='text'
                id="dryerSheet"
                placeholder='오늘의 건조기시트 매출을 입력해주세요'
                value={addComma(form.dryerSheet) || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="totalCost">총 매출</Label>
              <Input
                type='text'
                id="totalCost"
                value={addComma(totalCost) || ''}
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="submissionDate">제출일</Label>
              <Input 
                type="date" 
                id="submissionDate"
                min={minDate}
                value={minDate}
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="branchSalesRemark">비고</Label>
              <Input 
                type="textarea" 
                id="branchSalesRemark"
                placeholder="특이사항을 입력하세요" 
                value={form.branchSalesRemark}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>등록</Button>
        <Button color="secondary" onClick={onClose}>닫기</Button>
            </ModalFooter>
        </Modal>
    );
}

export default BranchSalesModal;