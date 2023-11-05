import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMainEmployees } from '../../store/actions/employeeMainAction';
import Loaders from '../components/Loaders';

const EmployeeListPage = () => {
  const dispatch = useDispatch();
  const { allEmployeeData, isLoading } = useSelector((state) => state.employee);
  console.log('allEmployeeData=>', allEmployeeData, isLoading);

  useEffect(() => {
    dispatch(getAllMainEmployees());
  }, []);

  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Employee Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Phone</th>
        </tr>
      </thead>
      {allEmployeeData.length === 0 ? (
        <h4>No employee found!</h4>
      ) : isLoading === true ? (
        <Loaders />
      ) : (
        <>
          {allEmployeeData &&
            allEmployeeData.map((edata, index) => {
              return (
                <tbody key={edata.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{edata.employeename}</td>
                    <td>{edata.email}</td>
                    <td>{edata.gender}</td>
                    <td>{edata.phone}</td>
                  </tr>
                </tbody>
              );
            })}
        </>
      )}
    </Table>
  );
};

export default EmployeeListPage;
