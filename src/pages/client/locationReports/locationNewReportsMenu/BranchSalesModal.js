// import React, { useEffect, useState } from 'react';
// import {callNewBranchSalesAPI} from  "../../../../apis/ReportAPICalls"
// import { useDispatch } from "react-redux";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   FormGroup,
//   Input,
//   Label,
//   Col,
//   Row
// } from 'reactstrap';
// import jwt_decode from 'jwt-decode';
// import './Modal.css'; // 올바른 경로로 수정



// // 매출보고서 모달
// function BranchSalesModal({ show, onClose }) {

//     const dispatch = useDispatch();

// useEffect(() => {
//     if (show) {
//       dispatch(callNewBranchSalesAPI(form));
//     }
//   }, [dispatch, show]);



//     // 제출일 오늘 이전 날짜 선택 못하게 설정
//     const [minDate, setMinDate] = useState('');
//     // 토큰으로 지점명, 지점장 자동 입력
//     const branch = JSON.parse(window.localStorage.getItem('branch'));
//     const member = jwt_decode(window.localStorage.getItem('accessToken'));
//     console.log(branch);
//     console.log(member);

//     //금액 입력 
//     const [officeSales, setOfficeSales] = useState('');
//     const [detergent, setDetergent] = useState('');
//     const [fabricSoftener, setFabricSoftener] = useState('');
//     const [bleach, setBleach] = useState('');
//     const [stainRemover, setStainRemover] = useState('');
//     const [washerCleaner, setWasherCleaner] = useState('');
//     const [dryerSheet, setDryerSheet] = useState('');
//     const [totalCost, setTotalCost] = useState(0);

//     // form 
//     const [form, setForm] = useState({
//         branchReportStatus: '접수',
//         branchSubmissionDate: '',
//         officeSales: '',
//         detergent: '',
//         fabricSoftener: '',
//         bleach: '',
//         stainRemover: '',
//         washerCleaner: '',
//         dryerSheet: '',
//         totalBranchSalesCost: '',
//         branchName: branch.branchName,
//         memberName: member.memberName
//     })

//     useEffect(() => {
//         setForm({
//             branchReportStatus: '접수',
//             branchSubmissionDate: '',
//             officeSales: '',
//             detergent: '',
//             fabricSoftener: '',
//             bleach: '',
//             stainRemover: '',
//             washerCleaner: '',
//             dryerSheet: '',
//             totalBranchSalesCost: '',
//             branchName: branch.branchName,
//             memberName: member.memberName
//         })

//     }, [show, branch.branchName, member.memberName])

//     // 금액 
//     useEffect(() => {
//         const calculateTotalSales = () => {
//             const total =
//                 (parseFloat(officeSales) || 0) +
//                 (parseFloat(detergent) || 0) +
//                 (parseFloat(fabricSoftener) || 0) +
//                 (parseFloat(bleach) || 0) +
//                 (parseFloat(stainRemover) || 0) +
//                 (parseFloat(washerCleaner) || 0) +
//                 (parseFloat(dryerSheet) || 0);
//             setTotalCost(total);
//         };
//         calculateTotalSales();
//     }, [officeSales, detergent, fabricSoftener, bleach, stainRemover, washerCleaner, dryerSheet]);

//     // 날짜 선택
//     useEffect(() => {
//         const today = new Date();
//         const formattedDate = today.toISOString().split('T')[0];
//         setMinDate(formattedDate);
//     }, []);

//     if (!show) {
//         return null;
//     }

//     const handleSubmit = () => {
//         const data = {
//             branchReportStatus: form.branchReportStatus,
//             branchSubmissionDate: form.branchSubmissionDate,
//             officeSales: form.officeSales,
//             detergent: form.detergent,
//             fabricSoftener: form.fabricSoftener,
//             bleach: form.bleach,
//             stainRemover: form.stainRemover,
//             washerCleaner: form.washerCleaner,
//             dryerSheet: form.dryerSheet,
//             totalBranchSalesCost: form.totalBranchSalesCost,
//             branchName: branch.branchName,
//             memberName: member.memberName
//         };
    
//         dispatch(callNewBranchSalesAPI({ data }));
//         alert('등록이 완료되었습니다'); 
//         onClose();
//     }

    


//     return (
//         <Modal
//             isOpen={show}
//             toggle={onClose}
//             centered
//             className="animate__animated animate__fadeInLeftBig custom-modal"
//         >
//             <ModalHeader toggle={onClose}>매출 보고서</ModalHeader>
//             <ModalBody>
//                 <Row form>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="branchName">지점명</Label>
//                             <Input 
//                                 type='text' 
//                                 id="branchName"
//                                 value={branch.branchName} 
//                                 readOnly 
//                             />
//                         </FormGroup>
//                     </Col>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="memberName">지점장명</Label>
//                             <Input 
//                                 type='text' 
//                                 id="memberName"
//                                 value={member.memberName}
//                                 readOnly 
//                             />
//                         </FormGroup>
//                     </Col>
//                 </Row>
//                 <Row form>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="officeSales">일 매출</Label>
//                             <Input 
//                                 type='text' 
//                                 id="officeSales"
//                                 placeholder='일매출을 입력해주세요'
//                                 value={officeSales}
//                                 onChange={(e) => setOfficeSales(e.target.value)}
//                             />
//                         </FormGroup>
//                     </Col>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="detergent">세제</Label>
//                             <Input 
//                                 type='text' 
//                                 id="detergent"
//                                 placeholder='오늘의 세제 매출을 입력해주세요'
//                                 value={detergent}
//                                 onChange={(e) => setDetergent(e.target.value)}
//                             />
//                         </FormGroup>
//                     </Col>
//                 </Row>
//                 <Row form>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="fabricSoftener">섬유유연제</Label>
//                             <Input 
//                                 type='text' 
//                                 id="fabricSoftener"
//                                 placeholder='오늘의 섬유유연제 매출을 입력해주세요'
//                                 value={fabricSoftener}
//                                 onChange={(e) => setFabricSoftener(e.target.value)}
//                             />
//                         </FormGroup>
//                     </Col>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="bleach">표백제</Label>
//                             <Input 
//                                 type='text' 
//                                 id="bleach"
//                                 placeholder='오늘의 표백제 매출을 입력해주세요'
//                                 value={bleach}
//                                 onChange={(e) => setBleach(e.target.value)}
//                             />
//                         </FormGroup>
//                     </Col>
//                 </Row>
//                 <Row form>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="stainRemover">얼룩제거제</Label>
//                             <Input 
//                                 type='text' 
//                                 id="stainRemover"
//                                 placeholder='오늘의 얼룩제거제 매출을 입력해주세요'
//                                 value={stainRemover}
//                                 onChange={(e) => setStainRemover(e.target.value)}
//                             />
//                         </FormGroup>
//                     </Col>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="washerCleaner">세탁조 클리너</Label>
//                             <Input 
//                                 type='text' 
//                                 id="washerCleaner"
//                                 placeholder='오늘의 세탁조클리너 매출을 입력해주세요'
//                                 value={washerCleaner}
//                                 onChange={(e) => setWasherCleaner(e.target.value)}
//                             />
//                         </FormGroup>
//                     </Col>
//                 </Row>
//                 <Row form>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="dryerSheet">건조기 시트</Label>
//                             <Input 
//                                 type='text' 
//                                 id="dryerSheet"
//                                 placeholder='오늘의 건조기시트 매출을 입력해주세요'
//                                 value={dryerSheet}
//                                 onChange={(e) => setDryerSheet(e.target.value)}
//                             />
//                         </FormGroup>
//                     </Col>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="totalCost">총 매출</Label>
//                             <Input
//                                 type='text'
//                                 id="totalCost"
//                                 value={totalCost} 
//                                 readOnly
//                             />
//                         </FormGroup>
//                     </Col>
//                 </Row>
//                 <Row form>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="submissionDate">제출일</Label>
//                             <Input 
//                                 type="date" 
//                                 id="submissionDate"
//                                 min={minDate}
//                                 value={minDate}
//                                 readOnly
//                             />
//                         </FormGroup>
//                     </Col>
//                     <Col md={6}>
//                         <FormGroup>
//                             <Label for="remarks">비고</Label>
//                             <Input 
//                                 type="textarea" 
//                                 id="remarks"
//                                 placeholder="특이사항을 입력하세요" 
//                             />
//                         </FormGroup>
//                     </Col>
//                 </Row>
//             </ModalBody>
//             <ModalFooter>
//                 <Button color="primary" onClick={handleSubmit}>등록</Button>
//                 <Button color="secondary" onClick={onClose}>닫기</Button>
//             </ModalFooter>
//         </Modal>
//     );
// }

// export default BranchSalesModal;


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
    branchReportStatus: '접수',
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
    memberName: member.memberName
  });

  // 금액 입력 
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setForm({
      branchReportStatus: '접수',
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
      memberName: member.memberName
    });
  }, [show, branch.branchName, member.memberName]);

  // 금액 
  useEffect(() => {
    const calculateTotalSales = () => {
      const total =
        (parseFloat(form.officeSales) || 0) +
        (parseFloat(form.detergent) || 0) +
        (parseFloat(form.fabricSoftener) || 0) +
        (parseFloat(form.bleach) || 0) +
        (parseFloat(form.stainRemover) || 0) +
        (parseFloat(form.washerCleaner) || 0) +
        (parseFloat(form.dryerSheet) || 0);
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
      [id]: value
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
                value={form.officeSales}
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
                value={form.detergent}
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
                value={form.fabricSoftener}
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
                value={form.bleach}
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
                value={form.stainRemover}
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
                value={form.washerCleaner}
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
                value={form.dryerSheet}
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
                value={totalCost}
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
                            <Label for="remarks">비고</Label>
                            <Input 
                                type="textarea" 
                                id="remarks"
                                placeholder="특이사항을 입력하세요" 
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