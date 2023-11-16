import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loaders from "../components/Loaders";
import { useNavigate } from "react-router-dom";
import { getAllMainStudents } from "../../store/actions/studentMainAction";

const StudentListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allStudentData, isLoading } = useSelector((state) => state.student);
    console.log("allStudentData=>", allStudentData, isLoading);

    useEffect(() => {
        dispatch(getAllMainStudents());
      }, []);

      const viewClick = (vData) => {
        navigate(`/redux/studentdetail/${vData.id}`);
      }; 
  return (
    <div className="container">
         {allStudentData.length === 0 ? (
        <h4>No Student found!</h4>
      ) : isLoading === true ? (
        <Loaders />
      ) : ( <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Subject</th>
          <th>Student Performance</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <>
        {allStudentData &&
          allStudentData.map((edata, index) => {
            return (
              <tbody key={edata.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{edata.studentname}</td>
                  <td>{edata.age}</td>
                  <td>{edata.gender}</td>
                  <td>{edata.favsubject}</td>
                  <td>{edata.performance}</td>
                  {edata.status === true ? (<td>Active</td>):(<td>Inactive</td>)}
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => viewClick(edata)}
                    >
                      View
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-warning">Edit</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </>
    </Table>)}
  
     
    
  </div>
  )
}

export default StudentListPage
