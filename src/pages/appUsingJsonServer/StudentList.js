import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const StudentList = () => {
  const navigate = useNavigate();
  const [allStudents, setallStudents] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const getAllstudentlist = () => {
    axios
      .get(`${process.env.REACT_APP_NEW_JSON_URL}/student`)
      .then((resp) => {
        console.log('Response:', resp);
        if (resp.statusText === 'OK') {
          // console.log("HI");
          setDataLoading(false);
          setallStudents(resp.data);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };
  useEffect(() => {
    getAllstudentlist();

    return () => {
      getAllstudentlist();
    };
  }, []);

  //deletestudent data
  const delClick = (delStu) => {
    if (window.confirm('Do you want to delete?')) {
      axios
        .delete(`${process.env.REACT_APP_NEW_JSON_URL}/student/${delStu.id}`)
        .then((delResp) => {
          console.log('delete_success=>', delResp);
          if (delResp.status == 200) {
            getAllstudentlist();
          }
        })
        .catch((err) => {
          console.log('delete_error=>', err);
        });
    }
  };

  // student edit data
  const editSClick = (esData)=>{
    navigate(`/studentedit/${esData.id}`, {
      state: { studata: esData },
    });
    console.log('esData =>', esData);

  }

  //view Student Data
  const viewSClick = (vsData) => {
    navigate(`/studentview/${vsData.id}`, {
      state: { singledata: vsData },
    });
    console.log('vsData =>', vsData);
  };
  return (
    <div className="container mt-4">
      <div className="mb-4">
        <Link className="btn btn-primary" to={'/studentadd'}>
          Add Student
        </Link>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Age</th>
            <th>Fav Subject</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        {allStudents &&
          allStudents.map((sData, index) => {
            return (
              <tbody key={sData.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{sData.studentname}</td>
                  <td>{sData.age}</td>
                  <td>{sData.favsubject}</td>
                  <td>{sData.gender}</td>
                  <td style={{
                        color:
                         sData.performance == 'Outstanding'
                            ? '#03c2fc'
                            : sData.performance == 'Excellent'
                            ? '#3498db'
                            : sData.performance == 'Good'
                            ? '#f1c40f'
                            : sData.performance == 'Poor'
                            ? '#e74c3c'
                            : '#18db55'
                      }}>{sData.performance}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => viewSClick(sData)}
                    >
                      View
                    </Button>{' '}
                    <Button variant="success" onClick={() => editSClick(sData)}>Edit</Button>{' '}
                    <Button variant="warning" onClick={() => delClick(sData)}>
                      Delete
                    </Button>{' '}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
};

export default StudentList;
