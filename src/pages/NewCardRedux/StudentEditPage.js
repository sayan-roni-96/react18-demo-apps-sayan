import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormSelect } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import makeAnimated from 'react-select/animated';
import { toast } from "react-toastify";
import { editExistStudent } from "../../store/actions/studentMainAction";
import ReactSelect from "react-select";

const StudentEditPage = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { stuedid } = useParams();
  // console.log("location=>", state);

  const [studentEditState, setStudentEditState] = useState({
    stuName: state.singleState.studentname || "",
    stuAge: state.singleState.age || "",
    stuGender: state.singleState.gender || "",
    stuSubject: state.singleState.favsubject || "",
    stuInterest: state.singleState.interest || "",
    stuPerformance: state.singleState.performance || "",
  });
  console.log('studentEditState',studentEditState);

  let onInputChange = (e) => {
    setStudentEditState({
      ...studentEditState,
      [e.target.name]: e.target.value,
    });
  };
// For React Select
const animatedComponents = makeAnimated();

const interOptions = [
  { value: 'drawing', label: 'Drawing' },
  { value: 'singing', label: 'Singing' },
  { value: 'swimming', label: 'Swimming' },
];

const onChangeSelect = (interestData) => {
  console.log('interestData=>', interestData);
  setStudentEditState({
    ...studentEditState,
    stuInterest: [...interestData],
  });
};
console.log('interest=>', studentEditState.stuInterest);
  const genderData = [
    {
      id: 1,
      gname: "Male",
      gvalue: "male",
    },
    {
      id: 2,
      gname: "Female",
      gvalue: "female",
    },
    {
      id: 3,
      gname: "Others",
      gvalue: "others",
    },
  ];

  const editSubmit = (evt) => {
    evt.preventDefault();
    if (
      !studentEditState.stuName ||
      !studentEditState.stuAge ||
      !studentEditState.stuGender ||
      !studentEditState.stuSubject ||
      !studentEditState.stuInterest ||
      !studentEditState.stuPerformance
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const newData = {
        studentname: studentEditState.stuName,
        age: studentEditState.stuAge,
        gender: studentEditState.stuGender,
        favsubject:studentEditState.stuSubject,
        interest:studentEditState.stuInterest,
        performance:studentEditState.stuPerformance
      };

      dispatch(editExistStudent({ sid: stuedid, newFormData: newData }))
        .then((resp) => {
          console.log("resp=>", resp);
          if (resp.type === "student/edit/fulfilled") {
            navigate("/redux/studentlist");
          }
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    }
  };
  return (
    <div className="container">
      <Form className="m-4" onSubmit={(evt) => editSubmit(evt)}>
        <div className="row">
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="stuName"
                value={studentEditState.stuName}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Student Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Age"
                name="stuAge"
                value={studentEditState.stuAge}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Student Performance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Performance"
                name="stuPerformance"
                value={studentEditState.stuPerformance}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Student Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject"
                name="stuSubject"
                value={studentEditState.stuSubject}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>
        <div className="col-md-6">
        <Form.Group md="6" controlId="validationCustom03">
            <Form.Label>Interest</Form.Label>
            <ReactSelect
              placeholder="Add your skills"
              options={interOptions}
              isMulti
              components={animatedComponents}
              value={studentEditState.stuInterest}
              onChange={(option) => onChangeSelect(option)}
            />
          </Form.Group>
        </div>
          <div className="col-md-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="stuGender"
              value={studentEditState.stuGender}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">--Select One--</option>
              {genderData.map((gdata, i) => {
                return (
                  <option key={gdata.id} value={gdata.gvalue}>
                    {gdata.gname}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default StudentEditPage
