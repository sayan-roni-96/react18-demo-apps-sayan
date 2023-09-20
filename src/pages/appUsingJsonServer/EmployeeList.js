import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Loaders from '../components/Loaders';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [allEmployee, setAllEmployee] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const getAllEmployee = () => {
    setDataLoading(true);
    axios
      .get(`${process.env.REACT_APP_JSON_URL}/employee`)
      .then((resp) => {
        console.log('resp=>', resp);
        if (resp.status === 200) {
          setDataLoading(false);
          setAllEmployee(resp.data.reverse());
        }
      })
      .catch((err) => {
        console.log('error=>', err);
        setDataLoading(false);
      });
  };

  useEffect(() => {
    getAllEmployee();

    return () => {
      getAllEmployee();
    };
  }, []);

  const editClick = (empData) => {
    navigate(`/employeeedit/${empData.id}`, {
      state: { singledata: empData },
    });
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <Link className="btn btn-primary" to={'/employeeadd'}>
          Add Employee
        </Link>
      </div>
      {dataLoading ? (
        <Loaders />
      ) : allEmployee.length == 0 ? (
        <h3>No data found!</h3>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name </th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          {allEmployee &&
            allEmployee.map((eData, index) => {
              return (
                <tbody key={eData.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{eData.employeename}</td>
                    <td>{eData.email}</td>
                    <td>{eData.phone}</td>
                    <td>
                      <Button variant="success">View</Button>{' '}
                      <Button
                        variant="warning"
                        onClick={() => editClick(eData)}
                      >
                        Edit
                      </Button>{' '}
                      <Button variant="danger">Delete</Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      )}
    </div>
  );
};

export default EmployeeList;
