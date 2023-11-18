import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  editExistEmployee,
  getSingleEmployee,
} from "../../store/actions/employeeMainAction";
import { toast } from "react-toastify";

const EmployeeEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { revid } = useParams();
  // console.log("location=>", state);

  const [employeeEditState, setEmployeeEditState] = useState({
    empName: state.singleState.employeename || "",
    empEmail: state.singleState.email || "",
    empPhone: state.singleState.phone || "",
    empGender: state.singleState.gender || "",
  });

  let onInputChange = (e) => {
    setEmployeeEditState({
      ...employeeEditState,
      [e.target.name]: e.target.value,
    });
  };

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
      !employeeEditState.empName ||
      !employeeEditState.empEmail ||
      !employeeEditState.empPhone ||
      !employeeEditState.empGender
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const newData = {
        employeename: employeeEditState.empName,
        email: employeeEditState.empEmail,
        phone: employeeEditState.empPhone,
        gender: employeeEditState.empGender,
      };

      dispatch(editExistEmployee({ eid: revid, newFormData: newData }))
        .then((resp) => {
          console.log("resp=>", resp);
          if (resp.type === "employee/edit/fulfilled") {
            navigate("/redux/employeelist");
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="empName"
                value={employeeEditState.empName}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="empEmail"
                value={employeeEditState.empEmail}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                name="empPhone"
                value={employeeEditState.empPhone}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="empGender"
              value={employeeEditState.empGender}
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
  );
};

export default EmployeeEditPage;
