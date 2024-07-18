import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BranchList() {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/branch/branchList')
            .then(response => {
                if (response.data && response.data.data && response.data.data.branchList) {
                    setBranches(response.data.data.branchList);
                }
            })
            .catch(error => console.error('Error fetching branches:', error));
    }, []);

    return (
        <div style={{ backgroundColor: '#D5E3F5', width: '300px', height: 'calc(70% - 15px)', borderRadius: '30px', padding: '20px' }}>
            <h1>Branch List</h1>
            <div>
                 {branches.map((branch, index) => (
                    <div key={index} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#FFFFFF', borderRadius: '10px' }}>
                        <p><strong>Name:</strong> {branch}</p>
                    </div>
                ))} 
            </div>
        </div>
    );
}

export default BranchList;

