import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loaders from '../../components/Loaders';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserList = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewSingleUser, setViewSingleUser] = useState({});

  const getAllUserData = () => {
    setIsLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setIsLoading(true);
        console.log('res==>', res);
        if (res.status == 200) {
          setAllUserData(res.data);

          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log('err==>', err);
      });
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  console.log('allUserData==>', allUserData);

  const handleClose = () => setShowViewModal(false);

  const viewUserDetail = (viewUser) => {
    console.log('viewUser=>', viewUser);
    setShowViewModal(true);
    if (viewUser) {
      setViewSingleUser(viewUser);
    }
  };

  return (
    <div className="container">
      {/* View Modal Start */}

      <Modal
        show={showViewModal}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            User Detail of {viewSingleUser && viewSingleUser.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h2>User Id:== {viewSingleUser && viewSingleUser.id}</h2>
            <h3>Email:== {viewSingleUser && viewSingleUser.email}</h3>
            <p>Phone:== {viewSingleUser && viewSingleUser.phone}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* View Modal End */}

      <h1>User List</h1>
      <div className="mb-4">
        <button className="btn btn-primary">Add New User</button>{' '}
      </div>
      {isLoading ? (
        <>
          <Loaders />
        </>
      ) : !allUserData ? (
        <h2>No User Found!</h2>
      ) : (
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#Sl. No.</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          {allUserData &&
            allUserData.map((uData, index) => {
              // console.log('uData=>', uData);
              return (
                <tbody key={uData.id}>
                  <tr>
                    <th scope="row">{uData.id}</th>
                    <td>{uData.name}</td>
                    <td>{uData.email}</td>
                    <td>{uData.phone}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => viewUserDetail(uData)}
                      >
                        View
                      </button>{' '}
                      <button className="btn btn-warning">Edit</button>{' '}
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      )}
    </div>
  );
};

export default UserList;
