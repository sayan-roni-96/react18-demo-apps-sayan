// EmployeeDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';
const EmployeeDetails = () => {
    const location=useLocation()
 const { singledata } = location.state;
  console.log('singledata =>', location);


  return (
    <div className="container mt-4">
      <h2>Employee Details</h2>
      <div>
        <strong>Name:</strong> {singledata.employeename}
      </div>
      <div>
        <strong>Email:</strong> {singledata.email}
      </div>
      <div>
        <strong>Phone:</strong> {singledata.phone}
      </div>
      {/* You can display more employee details here */}
    </div>
  );
};

export default EmployeeDetails;
