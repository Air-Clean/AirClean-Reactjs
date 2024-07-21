import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockBarChart from './StockBarChart';
import PartStockBarChart from './PartStockBarChart';
import { callDetergentsInfoAPI, callPartsInfoAPI } from '../../../apis/StockAPICalls';

function StockApplication() {
  const [detergents, setDetergents] = useState([]);
  const [detergentsFormValues, setDetergentsFormValues] = useState({});
  const [parts, setParts] = useState([]);
  const [partsFormValues, setPartsFormValues] = useState({});
  const [detergentsMaxClicked, setDetergentsMaxClicked] = useState(false);
  const [partsMaxClicked, setPartsMaxClicked] = useState(false);

  const dispatch = useDispatch();
  const detergentsInfo = useSelector(state => state.detergentsInfoReducer);
  const partsInfo = useSelector(state => state.partsInfoReducer);

  useEffect(() => {
    dispatch(callDetergentsInfoAPI());
    dispatch(callPartsInfoAPI());
  }, [dispatch]);

  useEffect(() => {
    if (detergentsInfo.length > 0) {
      const transformedDetergents = detergentsInfo.map(item => ({
        name: item.laundrySupply.laundrySupplyName,
        stockPercent: ((item.laundrySupplyStock / item.laundrySupplyMaxStock) * 100).toFixed(1),
        stock: item.laundrySupplyStock,
        maxStock: item.laundrySupplyMaxStock,
        managementCode: item.laundrySupplyManagementCode,
        updatedStock: item.laundrySupplyStock // 초기값을 현재 재고로 설정
      }));
      setDetergents(transformedDetergents);
    }
  }, [detergentsInfo]);

  useEffect(() => {
    if (partsInfo.length > 0) {
      const transformedParts = partsInfo.map(item => ({
        name: item.laundryPart.laundryPartName,
        stockPercent: ((item.laundryPartStock / item.laundryPartMaxStock) * 100).toFixed(1),
        stock: item.laundryPartStock,
        maxStock: item.laundryPartMaxStock,
        managementCode: item.laundryPartManagementCode,
        updatedStock: item.laundryPartStock // 초기값을 현재 재고로 설정
      }));
      setParts(transformedParts);
    }
  }, [partsInfo]);

  const handleInputChange = (e, setFormValues, setItems, items) => {
    const { name, value } = e.target;
    const numericValue = value ? parseInt(value, 10) : ''; // 값이 없을 때 빈 문자열로 설정
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
      // Reset values if already clicked
      setDetergentsFormValues({});
      setDetergents(detergents.map(detergent => ({
        ...detergent,
        updatedStock: detergent.stock // Reset to original stock
      })));
    } else {
      // Set to max values
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
      // Reset values if already clicked
      setPartsFormValues({});
      setParts(parts.map(part => ({
        ...part,
        updatedStock: part.stock // Reset to original stock
      })));
    } else {
      // Set to max values
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

  const getLabels = (data) => data.map(item => item.name);
  const getDataValues = (data) => data.map(item => item.stockPercent);
  const getOriginalValues = (data) => data.map(item => item.stock);

  const getTableData = (items, formValues) => items.map(item => ({
    name: item.name,
    updatedStock: formValues[item.name] !== undefined ? formValues[item.name] : '', // 값이 없을 때 빈 문자열로 설정
    managementCode: item.managementCode
  }));

  return (
    <div className='menu1_layout'>
    <div className='flex_wrap'>
    <div style={{ padding: '20px' }}>
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

      <div style={{ margin: '40px 0' }} /> {/* 컴포넌트 간의 간격 추가 */}

      <h2>Parts</h2>
      <PartStockBarChart
        labels={getLabels(parts)}
        dataValues={getDataValues(parts)}
        inputValues={partsFormValues}
        originalValues={getOriginalValues(parts)}
        onInputChange={(e) => handleInputChange(e, setPartsFormValues, setParts, parts)}
        onMaxClick={handlePartsMaxClick}
        showOriginalValue={true}
      />

      <div style={{ margin: '40px 0' }} /> {/* 컴포넌트 간의 간격 추가 */}

      <h2>Detergents Table</h2>
      <table style={{ width: '70%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            {getTableData(detergents, detergentsFormValues).map((item) => (
              <th key={item.managementCode} style={{ padding: '10px', minWidth: '100px', textAlign: 'center' }}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {getTableData(detergents, detergentsFormValues).map((item) => (
              <td key={item.managementCode} style={{ padding: '10px', minWidth: '100px', textAlign: 'center' }}>{item.updatedStock}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <div style={{ margin: '40px 0' }} /> {/* 컴포넌트 간의 간격 추가 */}

      <h2>Parts Table</h2>
      <table style={{ width: '70%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            {getTableData(parts, partsFormValues).map((item) => (
              <th key={item.managementCode} style={{ padding: '10px', minWidth: '100px', textAlign: 'center' }}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {getTableData(parts, partsFormValues).map((item) => (
              <td key={item.managementCode} style={{ padding: '10px', minWidth: '100px', textAlign: 'center' }}>{item.updatedStock}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}

export default StockApplication;
