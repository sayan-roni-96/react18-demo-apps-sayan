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

  const viewClick = (vData) => {
    navigate(`/employeedetails/${vData.id}`, {
      state: { singledata: vData },
    });
    console.log('vData=>', vData);
  };

  const deleteClick = (delEmp) => {
    if (window.confirm('Do you want to delete?')) {
      axios
        .delete(`${process.env.REACT_APP_JSON_URL}/employee/${delEmp.id}`)
        .then((delResp) => {
          console.log('delete_success=>', delResp);
          if (delResp.status == 200) {
            getAllEmployee();
          }
        })
        .catch((err) => {
          console.log('delete_error=>', err);
        });
    }
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
              <th>Gender</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Performance</th>
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
                    <td>{eData.gender}</td>
                    <td>{eData.phone}</td>
                    <td>{eData.status == true ? 'Active' : 'Inactive'}</td>
                    <td
                      style={{
                        color:
                          eData.performance == 'Good'
                            ? '#03c2fc'
                            : eData.performance == 'Better'
                            ? 'green'
                            : eData.performance == 'Worst'
                            ? 'red'
                            : 'yellow',
                      }}
                    >
                      {eData.performance}
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => viewClick(eData)}
                      >
                        View
                      </Button>{' '}
                      <Button
                        variant="warning"
                        onClick={() => editClick(eData)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant="danger"
                        onClick={() => deleteClick(eData)}
                      >
                        Delete
                      </Button>
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
