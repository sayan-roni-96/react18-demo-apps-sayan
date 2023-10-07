import axios from 'axios';
import Loaders from '../components/Loaders';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WorkerViewModal from './modals/WorkerViewModal';

const WorkerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [allWorker, setallWorker] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [newDataview, setnewDataview] = useState(false);
  const [workerDetail, setworkerDetail] = useState();
  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
//  // for search
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };
  const [newWorkerData, setNewWorkerData] = useState({
    firstName: '', // Change 'name' to 'firstName'
    lastName: '',  // Add 'lastName'
    age: '',
    email: '',
    phone: '',
    gender: '',
    image: '',
  });
  const [editWorkerData, setEditWorkerData] = useState({
    id: '', // Add 'id' to track the worker being edited
    efirstName: '',
    elastName: '',
    eage: '',
    eemail: '',
    ephone: '',
    egender: '',
    eimage: '',
  });
  const editWorkerModal = (workerData) => {
    setEditWorkerData({
      id: workerData.id,
      efirstName: workerData.firstName,
      elastName: workerData.lastName,
      eage: workerData.age,
      eemail: workerData.email,
      ephone: workerData.phone,
      egender: workerData.gender,
      eimage: workerData.image,
    });
    setShowEditWorkerModal(true); // Open the edit worker modal
  };
  const genderWorkData = [
    {
      id: 1,
      name: 'Male',
      value: 'Male',
    },
    {
      id: 2,
      name: 'Female',
      value: 'Female',
    },
    {
      id: 3,
      name: 'Others',
      value: 'Others',
    },
  ];
  
  const [showEditWorkerModal, setShowEditWorkerModal] = useState(false);

  // const filterWorkers = () => {
  //   const query = searchQuery.toLowerCase();
  //   const filtered = allWorker.filter((worker) => {
  //     const fullName = `${worker.firstName} ${worker.lastName}`.toLowerCase();
  //     return fullName.includes(query);
  //   });
  //   setFilteredWorkers(filtered);
  // };
  // const handleResetSearch = () => {
  //   setSearchQuery('');
  //   setFilteredWorkers([]);
  // };

//  // Function to handle changes in the input fields for editing a worker
//   const handleEditWorkerChange = (e) => {
//     const { name, value } = e.target;
//     setEditWorkerData({ ...editWorkerData, [name]: value });
//   };

  // Function to handle updating the edited worker data
  const handleUpdateWorker = () => {
    const updatedData = {
      firstName: editWorkerData.efirstName,
      lastName:  editWorkerData.elastName,
      age:  editWorkerData.eage,
      email : editWorkerData.eemail,
      // Add other properties here as needed
    };
  
    axios
    .put(`${process.env.REACT_APP_NEW_WORKER_JSON_URL}/users/${editWorkerData.id}`, updatedData)
    .then((resp) => {
      console.log('resp=>', resp);
      if (resp.status === 200) {
        setShowEditWorkerModal(false); // Close the edit worker modal
        // Update the client-side data with the updated worker data
        setallWorker((prevWorkers) => {
          return prevWorkers.map((worker) => {
            if (worker.id === editWorkerData.id) {
              return {
                ...worker,
                firstName: editWorkerData.efirstName,
                lastName:  editWorkerData.elastName,
                age:  editWorkerData.eage,
                email : editWorkerData.eemail,
                // Update other properties here as needed
              };
            }
            return worker;
          });
        });
      }
    })
    .catch((err) => {
      console.error('Error occurred while updating user data:', err);
    });
  };


  // Replace with your default image URL
  const defaultImageUrl = 'https://robohash.org/perferendisideveniet.png';

  // Function to handle changes in the input fields for adding a worker
  const handleAddWorkerChange = (e) => {
    const { name, value } = e.target;
    setNewWorkerData({ ...newWorkerData, [name]: value });
  };


  // Function to handle saving the new worker data
  const handleSaveWorker = () => {
    axios
      .post(`${process.env.REACT_APP_NEW_WORKER_JSON_URL}/users/add`, newWorkerData)
      .then((resp) => {
        console.log('resp=>', resp);
        // If the save request was successful, you can update the state, close the modal, and clear the form.
        if (resp.status === 200) {
          console.log('hi');
          setShowAddWorkerModal(false); // Close the add worker modal
          setNewWorkerData({
            firstName: '', 
            lastName: '',  
            age: '',
            email: '',
            phone: '',
            gender: '',
            image: '',
          });
           setallWorker([...allWorker, resp.data]); 
          //getAllWorker(); // Refresh the worker list
        }
      })
      .catch((err) => {
        console.log('error=>', err);
      });
  };

  // Get all worker list
  const getAllWorker = () => {
    setDataLoading(true);
    axios
      .get(`${process.env.REACT_APP_NEW_WORKER_JSON_URL}/users`)
      .then((resp) => {
        console.log('resp=>', resp);
        if (resp.status === 200) {
          setDataLoading(false);
          setallWorker(resp.data.users.reverse());
        }
      })
      .catch((err) => {
        console.log('error=>', err);
        setDataLoading(false);
      });
  };

  useEffect(() => {
    getAllWorker();
  }, []);

  /* View data on modal */
  const handleClose = () => setnewDataview(false);

  const viewDataModal = (newWData) => {
    console.log('newWData=>', newWData);
    setnewDataview(true);
    setworkerDetail(newWData);
  };

  /* Delete user data from API */
  const deleteWorkerClick = (dId) => {
    console.log('dId->', dId);
    if (window.confirm('Do you want to delete?')) {
      const removeUser = [...allWorker].filter((uData, indx) => {
        // console.log('deleteClick-Data->', uData.id);
      // console.log('deleteClick-Indx->', uData.id !== dId);
         return uData.id !== dId;
       });
       setallWorker(removeUser);
    }
  };

  return (
    <div className="container mt-4">
      {/* This modal is used for viewing worker details */}
      <WorkerViewModal
        newDataview={newDataview}
        handleClose={handleClose}
        workerDetail={workerDetail}
      />
      {/* View modal end */}

      {/* Add Modal Start */}
      <Modal show={showAddWorkerModal} onHide={() => setShowAddWorkerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="firstName"> {/* Change 'name' to 'firstName' */}
              <Form.Label>First Name</Form.Label> {/* Change 'Name' to 'First Name' */}
              <Form.Control
                type="text"
                name="firstName"
                value={newWorkerData.firstName}
                onChange={handleAddWorkerChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName"> {/* Add 'lastName' */}
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={newWorkerData.lastName}
                onChange={handleAddWorkerChange}
              />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={newWorkerData.age}
                onChange={handleAddWorkerChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newWorkerData.email}
                onChange={handleAddWorkerChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={newWorkerData.phone}
                onChange={handleAddWorkerChange}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={newWorkerData.gender}
                onChange={handleAddWorkerChange}
              >
                <option value="">--Select One--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={newWorkerData.image}
                onChange={handleAddWorkerChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddWorkerModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveWorker}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add Modal End */}

      {/*Edit Modal Open */}
      <Modal show={showEditWorkerModal} onHide={() => setShowEditWorkerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="efirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="efirstName"
                value={editWorkerData.efirstName}
                onChange={(e) => {
                  setEditWorkerData({
                    ...editWorkerData,
                    efirstName: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="elastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="elastName"
                  value={editWorkerData.elastName}
                  onChange={(e) => {
                    setEditWorkerData({
                      ...editWorkerData,
                      elastName: e.target.value, // Update elastName separately
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="eage">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="eage"
                  value={editWorkerData.eage}
                  onChange={(e) => {
                    setEditWorkerData({
                      ...editWorkerData,
                      eage: e.target.value, // Update eage separately
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="eemail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="eemail"
                  value={editWorkerData.eemail}
                  onChange={(e) => {
                    setEditWorkerData({
                      ...editWorkerData,
                      eemail: e.target.value, // Update eage separately
                    });
                  }}
                />
              </Form.Group>
            {/* <Form.Group controlId="elastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="elastName"
                value={editWorkerData.elastName}
                onChange={handleEditWorkerChange}
              />
            </Form.Group> */}
            {/* Add other input fields for editing */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditWorkerModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateWorker}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Edit Modal Close*/ }

      <div className="mb-4">
        <Link className="btn btn-primary" to={''} onClick={() => setShowAddWorkerModal(true)}>
          Add Worker
        </Link>
      </div>
      <div className="mb-4">
            <input
              type="text"
              placeholder="Search workers by name"
              value={searchQuery}
              // onChange={handleSearchChange}
            />
            <Button variant="secondary">
              Reset
            </Button>
      </div>
      {dataLoading ? (
        <Loaders />
      ) : allWorker.length === 0 ? (
        <h3>No data found!</h3>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allWorker.map((wData, index) => (
              <tr key={wData.id}>
                <th scope="row">{wData.id}</th>
                <td>{wData.firstName}</td>
                <td>{wData.lastName}</td>
                <td>{wData.age}</td>
                <td>{wData.email}</td>
                <td>{wData.phone}</td>
                <td>{wData.gender}</td>
                <td>
                  <img src={wData.image || defaultImageUrl} alt="Worker" width="100" height="100" />
                </td>
                <td>
                <Button variant="success" onClick={() => viewDataModal(wData)}>
                    View
                  </Button>{' '}
                <Button variant="warning" onClick={() => editWorkerModal(wData)}>Edit</Button>{' '} 
                  <Button variant="danger" onClick={() => deleteWorkerClick(wData.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default WorkerList;
