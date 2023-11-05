import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSingleEmployee } from '../../store/actions/employeeMainAction';
import { Button, Card } from 'react-bootstrap';

const EmployeeViewPage = () => {
  const dispatch = useDispatch();
  const { rvid } = useParams();
  console.log('rvid=>', rvid);

  const { singleEmployee } = useSelector((state) => state.employee);

  console.log('singleEmployee=>', singleEmployee);

  useEffect(() => {
    dispatch(getSingleEmployee(rvid));
  }, []);

  return (
    <Card>
      <Card.Header as="h5">View Details</Card.Header>
      <Card.Body>
        <Card.Title>{singleEmployee.employeename}</Card.Title>
        <Card.Text>
          {singleEmployee.email}
          <br />
          {singleEmployee.phone}
        </Card.Text>
        <Link variant="primary" to={'/redux/employeelist'}>
          Go Back
        </Link>
      </Card.Body>
    </Card>
  );
};

export default EmployeeViewPage;
