import React, { useEffect, useState } from 'react';
import { callNewExpenseAPI } from "../../../../apis/ReportAPICalls";
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



function ExpenseModal({show, onClose}) {
    const dispatch = useDispatch();
    const [minDate, setMinDate] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const branch = JSON.parse(window.localStorage.getItem('branch'));
    const member = jwt_decode(window.localStorage.getItem('accessToken'));
    const [form, setForm] = useState({
        electricityBill: '',
        waterBill: '',
        gasBill: '',
        partTimeSalary: '',
        repairCost: '',
        totalExpenseCost: '',
        expenseReportStatus: '접수',
        expenseSubmissionDate: '',
        branchName: branch.branchName,
        memberName: member.memberName
    });
    const handleSubmit = () => {
        const data = {
            ...form,
            totalExpenseCost : totalCost
        };

        dispatch(callNewExpenseAPI(data));
        alert('등록이 완료되었습니다!');
        onClose();
    }
    const handleChange = (e) =>{
        const {id, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }))
    }

    // 날짜
    useEffect(() => {
        const today = new Date();
        const formatteDate = today.toISOString().split('T')[0];
        setMinDate(formatteDate);
    },[]);

      // 금액 
    useEffect(() => {
        const calculateTotalSales = () => {
        const total =
            (parseFloat(form.electricityBill) || 0) +
            (parseFloat(form.waterBill) || 0) +
            (parseFloat(form.gasBill) || 0) +
            (parseFloat(form.partTimeSalary) || 0) +
            (parseFloat(form.repairCost) || 0) ;
        setTotalCost(total);
        };
        calculateTotalSales();
    }, [form]);

    // form
    useEffect(() => {
        setForm({
        expenseReportStatus: '접수',
        expenseSubmissionDate: '',
        electricityBill: '',
        waterBill: '',
        gasBill: '',
        bleach: '',
        partTimeSalary: '',
        repairCost: '',
        totalExpenseCost: '',
        branchName: branch.branchName,
        memberName: member.memberName
        });
    }, [show, branch.branchName, member.memberName]);

    if (!show){
        return null;
    }





    return (
        <Modal
        isOpen={show}
        toggle={onClose}
        centered
        className="animate__animated animate__fadeInLeftBig custom-modal"
        >
        <ModalHeader toggle={onClose}>지출 보고서</ModalHeader>
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
                    <Label for="electricityBill">전기세 : </Label>
                    <Input
                        type='text'
                        id="electricityBill"
                        placeholder='이번달 전기세를 입력해주세요.'
                        value={form.electricityBill}
                        onChange={handleChange}
                    />
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                    <Label for="waterBill">수도세 : </Label>
                    <Input
                        type='text'
                        id="waterBill"
                        placeholder='이번달 수도세를 입력해주세요.'
                        value={form.waterBill}
                        onChange={handleChange}
                    />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                    <Label for="gasBill">가스비 : </Label>
                    <Input
                        type='text'
                        id="gasBill"
                        placeholder='이번달 가스비를 입력해주세요.'
                        value={form.gasBill}
                        onChange={handleChange}
                    />
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                    <Label for="partTimeSalary">알바비 : </Label>
                    <Input
                        type='text'
                        id="partTimeSalary"
                        placeholder='이번달 알바비를 입력해주세요.'
                        value={form.partTimeSalary}
                        onChange={handleChange}
                    />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                    <Label for="repairCost">시설물수리비 : </Label>
                    <Input
                        type='text'
                        id="repairCost"
                        placeholder='이번달 시설물수리비를 입력해주세요.'
                        value={form.repairCost}
                        onChange={handleChange}
                    />
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                    <Label for="totalCost">총 지출</Label>
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

export default ExpenseModal;