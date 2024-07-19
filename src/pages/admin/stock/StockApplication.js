import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import StockBarChart from './StockBarChart';
import { callDetergentAPI, callPartAPI } from '../../../apis/StockAPICalls';

function StockApplication() {
  const [detergents, setDetergents] = useState([]);
  const [parts, setParts] = useState([]);
  const [formValues, setFormValues] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callDetergentAPI())
  }, []);
  useSelector(state => state.detergentsInfoReducer);

  // const fetchDetergents = () => {
  //   fetch('/company/h-stock/detergents')
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.status === 200) {
  //         const transformedDetergents = data.data.map(item => ({
  //           name: item.laundrySupply.laundrySupplyName,
  //           stockPercent: (item.laundrySupplyStock / item.laundrySupplyMaxStock) * 100,
  //           stock: item.laundrySupplyStock,
  //           maxStock: item.laundrySupplyMaxStock
  //         }));
  //         setDetergents(transformedDetergents);
  //       } else {
  //         console.error('API error:', data.message);
  //       }
  //     })
  //     .catch(error => console.error('Fetch error:', error));
  // };

//   const fetchParts = () => {
//     fetch('/company/h-stock/parts')
//       .then(response => response.json())
//       .then(data => {
//         if (data.status === 200) {
//           const transformedParts = data.data.map(item => ({
//             name: item.laundryPart.laundryPartName,
//             stockPercent: (item.laundryPartStock / item.laundryPartMaxStock) * 100,
//             stock: item.laundryPartStock,
//             maxStock: item.laundryPartMaxStock
//           }));
//           setParts(transformedParts);
//         } else {
//           console.error('API error:', data.message);
//         }
//       })
//       .catch(error => console.error('Fetch error:', error));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value
//     });
//   };

// //   const handleSubmit = () => {
// //     fetch('/company/h-stock/applications', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         ...formValues,
// //         hApplicationStatus: 'Submitted',
// //         hApplicationDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
// //         hApproverName: '', // 필요 시 추가
// //         hApprovalDate: null, // 필요 시 추가
// //         employeeCode: '' // 필요 시 추가
// //       }),
// //     })
// //       .then(response => response.json())
// //       .then(data => {
// //         if (data.status === 200) {
// //           alert('Application submitted successfully');
// //         } else {
// //           console.error('Submission error:', data.message);
// //         }
// //       })
// //       .catch(error => console.error('Submit error:', error));
// //   };

//   const getLabels = (items) => items.map(item => item.name);
//   const getDataValues = (items) => items.map(item => item.stockPercent);

  return (
    <div>
      <h2>Detergents</h2>
      {/* <StockBarChart
        labels={getLabels(detergents)}
        dataValues={getDataValues(detergents)}
        inputValues={formValues}
        onInputChange={handleInputChange}
      /> */}
      <h2>Parts</h2>
      {/* <StockBarChart
        labels={getLabels(parts)}
        dataValues={getDataValues(parts)}
        inputValues={formValues}
        onInputChange={handleInputChange}
      /> */}
      {/* <div>
        <button onClick={handleSubmit}>Submit</button>
      </div> */}
    </div>
  );
}

export default StockApplication;
