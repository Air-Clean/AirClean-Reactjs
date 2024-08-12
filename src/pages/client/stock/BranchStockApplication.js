import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockBarChart from './StockBarChart';
import PartStockBarChart from './PartStockBarChart';
import { callDetergentsInfoAPI, callPartsInfoAPI } from '../../../apis/StockAPICalls';
import jwtDecode from "jwt-decode";
import './BranchStockApplication.css'; // CSS 파일을 import

function BranchStockApplication() {
  const [detergents, setDetergents] = useState([]);
  const [detergentsFormValues, setDetergentsFormValues] = useState({});
  const [parts, setParts] = useState([]);
  const [partsFormValues, setPartsFormValues] = useState({});
  const [detergentsMaxClicked, setDetergentsMaxClicked] = useState(false);
  const [partsMaxClicked, setPartsMaxClicked] = useState(false);

  const dispatch = useDispatch();
  const detergentsInfo = useSelector(state => state.detergentsInfoReducer);
  const partsInfo = useSelector(state => state.partsInfoReducer);

  const branch = JSON.parse(window.localStorage.getItem('branch'));

  useEffect(() => {
    dispatch(callDetergentsInfoAPI());
    dispatch(callPartsInfoAPI());
  }, [dispatch]);

  useEffect(() => {
    if (detergentsInfo.length > 0) {
      // branchCode가 일치하는 detergents만 필터링
      const filteredDetergents = detergentsInfo.filter(item => item.branchCode === branch.branchCode);
      
      const transformedDetergents = filteredDetergents.map(item => ({
        name: item.laundrySupply.laundrySupplyName,
        stockPercent: ((item.laundrySupplyStock / item.laundrySupplyMaxStock) * 100).toFixed(1),
        stock: item.laundrySupplyStock,
        maxStock: item.laundrySupplyMaxStock,
        managementCode: item.laundrySupplyManagementCode,
        updatedStock: null // 초기값을 null로 설정
      }));
      setDetergents(transformedDetergents);
    }
  }, [detergentsInfo, branch.branchCode]); // useEffect에서 branchCode를 추가하여 재렌더링 시 필터링이 동작하도록 설정

  useEffect(() => {
    if (partsInfo.length > 0) {
      // branchCode가 일치하는 parts만 필터링
      const filteredParts = partsInfo.filter(item => item.branchCode === branch.branchCode);
      
      const transformedParts = filteredParts.map(item => ({
        name: item.laundryPart.laundryPartName,
        stockPercent: ((item.laundryPartStock / item.laundryPartMaxStock) * 100).toFixed(1),
        stock: item.laundryPartStock,
        maxStock: item.laundryPartMaxStock,
        managementCode: item.laundryPartManagementCode,
        updatedStock: null // 초기값을 null로 설정
      }));
      setParts(transformedParts);
    }
  }, [partsInfo, branch.branchCode]); // useEffect에서 branchCode를 추가하여 재렌더링 시 필터링이 동작하도록 설정


  const handleInputChange = (e, setFormValues, setItems, items) => {
    const { name, value } = e.target;
    const numericValue = value ? parseInt(value, 10) : null; // 값이 없을 때 null로 설정
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: numericValue
    }));

    setItems(items.map(item =>
      item.name === name ? { ...item, updatedStock: numericValue } : item
    ));
  };

  const handleMaxClick = () => {
    if (detergentsMaxClicked) {
      // 이미 클릭된 경우 값을 리셋
      setDetergentsFormValues({});
      setDetergents(detergents.map(detergent => ({
        ...detergent,
        updatedStock: null // null로 리셋
      })));
    } else {
      // 최대값으로 설정
      const updatedFormValues = {};
      detergents.forEach(detergent => {
        updatedFormValues[detergent.name] = detergent.maxStock - detergent.stock;
      });

      setDetergentsFormValues(updatedFormValues);
      setDetergents(detergents.map(detergent => ({
        ...detergent,
        updatedStock: detergent.maxStock - detergent.stock
      })));
    }

    setDetergentsMaxClicked(!detergentsMaxClicked);
  };

  const handlePartsMaxClick = () => {
    if (partsMaxClicked) {
      // 이미 클릭된 경우 값을 리셋
      setPartsFormValues({});
      setParts(parts.map(part => ({
        ...part,
        updatedStock: null // null로 리셋
      })));
    } else {
      // 최대값으로 설정
      const updatedFormValues = {};
      parts.forEach(part => {
        updatedFormValues[part.name] = part.maxStock - part.stock;
      });

      setPartsFormValues(updatedFormValues);
      setParts(parts.map(part => ({
        ...part,
        updatedStock: part.maxStock - part.stock
      })));
    }

    setPartsMaxClicked(!partsMaxClicked);
  };

  const handleSubmit = async () => {
    const detergentsMapping = [
      'bDetergent',
      'bSoftener',
      'bBleach',
      'bRemover',
      'bDrumCleaner',
      'bSheet'
    ];
  
    const partsMapping = [
      'bLaundryFilter',
      'bDryerFilter',
      'bDryCleanerFilter'
    ];
  
    const mapData = (items, mapping) => items.reduce((acc, item, index) => {
      acc[mapping[index]] = item.updatedStock !== null ? item.updatedStock : 0;
      return acc;
    }, {});
  
    const detergentsData = mapData(detergents, detergentsMapping);
    const partsData = mapData(parts, partsMapping);
    const members = jwtDecode(window.localStorage.getItem('accessToken'));
  
    // 신청 값의 총합 계산
    const totalRequested = Object.values(detergentsData).reduce((sum, val) => sum + val, 0) +
                          Object.values(partsData).reduce((sum, val) => sum + val, 0);
  
    if (totalRequested <= 20) {
      alert("신청 값의 총합이 20을 넘지 않습니다.");
      return;
    }
  
    const userConfirmed = window.confirm('신청하시겠습니까?');
    if (!userConfirmed) {
      return; // 사용자가 취소 버튼을 눌렀을 때
    }
  
    const requestData = {
      ...detergentsData,
      ...partsData,
      bApplicationStatus: "미승인",
      bApplicationDate: new Date().toISOString().split('T')[0],
      memberId: members.sub,
      applicantName: members.memberName,
      branchCode: branch.branchCode
    };
  
    const requestUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/client/stock/application`;
  
    console.log('requestData', requestData);
    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(requestData)
      });
  
      if (response.ok) {
        console.log('Data submitted successfully');

        setDetergentsFormValues({});
        setPartsFormValues({});
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getLabels = (data) => data.map(item => item.name);
  const getDataValues = (data) => data.map(item => item.stockPercent);
  const getOriginalValues = (data) => data.map(item => item.stock);

  const getTableData = (items, formValues) => items.map(item => ({
    name: item.name,
    updatedStock: formValues[item.name] !== undefined ? formValues[item.name] : null, // 값이 없을 때 null로 설정
    managementCode: item.managementCode
  }));

  return (
    <div className='branchStock_menu1_layout'>
      <div className='branchStock_flex_wrap' style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='branchStock_stock_chart_section'>
          <div className='branchStock_stock_chart_container'>
            <h2>Detergents</h2>
            <StockBarChart
              labels={getLabels(detergents)}
              dataValues={getDataValues(detergents)}
              inputValues={detergentsFormValues}
              originalValues={getOriginalValues(detergents)}
              onInputChange={(e) => handleInputChange(e, setDetergentsFormValues, setDetergents, detergents)}
              onMaxClick={handleMaxClick}
              showOriginalValue={false}
            />
          </div>
  
          <div className='branchStock_stock_chart_container'>
            <h2>Parts</h2>
            <PartStockBarChart
              labels={getLabels(parts)}
              dataValues={getDataValues(parts)}
              inputValues={partsFormValues}
              originalValues={getOriginalValues(parts)}
              onInputChange={(e) => handleInputChange(e, setPartsFormValues, setParts, parts)}
              onMaxClick={handlePartsMaxClick}
              showOriginalValue={false}
            />
          </div>
        </div>
  
        <div className='branchStock_flex_wrap_table'>
          <div className='branchStock_table_container'>
            <h3>Detergents Application</h3>
            <table className='branchStock_table_stock_application'>
              <thead>
                <tr>
                  <th>Detergent</th>
                  <th>Apply Quantity</th>
                </tr>
              </thead>
              <tbody>
                {detergents.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="number"
                        name={item.name}
                        value={detergentsFormValues[item.name] !== undefined ? detergentsFormValues[item.name] : ''}
                        onChange={(e) => handleInputChange(e, setDetergentsFormValues, setDetergents, detergents)}
                        disabled={item.updatedStock === null}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className='branchStock_table_container'>
            <h3>Parts Application</h3>
            <table className='branchStock_table_stock_application'>
              <thead>
                <tr>
                  <th>Part</th>
                  <th>Apply Quantity</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="number"
                        name={item.name}
                        value={partsFormValues[item.name] !== undefined ? partsFormValues[item.name] : ''}
                        onChange={(e) => handleInputChange(e, setPartsFormValues, setParts, parts)}
                        disabled={item.updatedStock === null}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        <div className='branchStock_submit_section'>
          <button onClick={handleSubmit}>신청</button>
        </div>
      </div>
    </div>
  );
  
  
}

export default BranchStockApplication;
