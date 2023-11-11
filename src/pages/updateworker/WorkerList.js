import axios from 'axios';
import Loaders from '../components/Loaders';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WorkerViewModal from './modals/WorkerViewModal';
import AddWorkerModal from './modals/AddWorkerModal';
import EditWorkerModal from './modals/EditWorkerModal';

const WorkerList = () => {
  // const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [allWorker, setallWorker] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [newDataview, setnewDataview] = useState(false);
  const [workerDetail, setworkerDetail] = useState();
  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSelectedUsersModal, setShowSelectedUsersModal] = useState(false);
  
  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');
  //  // for search
  //   const handleSearchChange = (e) => {
  //     setSearchQuery(e.target.value);
  //   };
  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      // Remove the user from the selected list
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      // Add the user to the selected list
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Function to open the modal to view selected users' details
  const viewSelectedUsers = () => {
    setShowSelectedUsersModal(true);
    // Set the worker details for the selected users
    // Use the selectedUsers state to get the selected user IDs
    const selectedWorkerDetails = allWorker.filter((worker) =>
      selectedUsers.includes(worker.id)
    );
    setSelectedUsers(selectedWorkerDetails.map((worker) => worker.id));
  };

  // Function to remove a user from the selected list
  const removeSelectedUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((id) => id !== userId));
  };

  const [newWorkerData, setNewWorkerData] = useState({
    firstName: '', // Change 'name' to 'firstName'
    lastName: '', // Add 'lastName'
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
      id: editWorkerData.id,
      firstName: editWorkerData.efirstName,
      lastName: editWorkerData.elastName,
      age: editWorkerData.eage,
      email: editWorkerData.eemail,
      phone : editWorkerData.ephone,  
      gender: editWorkerData.egender,    
      image: editWorkerData.eimage,
      // Add other properties here as needed
    };

    axios
      .put(
        `${process.env.REACT_APP_NEW_WORKERS_JSON_URL}/users/${editWorkerData.id}`,
        updatedData
      )
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
                  lastName: editWorkerData.elastName,
                  age: editWorkerData.eage,
                  email: editWorkerData.eemail,
                  phone : editWorkerData.ephone,
                  gender: editWorkerData.egender,   
                  image: editWorkerData.eimage, 
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
      .post(
        `${process.env.REACT_APP_NEW_WORKERS_JSON_URL}/users/add`,
        newWorkerData
      )
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
      .get(`${process.env.REACT_APP_NEW_WORKERS_JSON_URL}/users`)
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

  // Search Function
  const onSearch = (evt) => {
    setSearch(evt.target.value);
  };

  const onGetSearch = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    setSearch('');
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
      <AddWorkerModal
      showAddWorkerModal={showAddWorkerModal}
      setShowAddWorkerModal={setShowAddWorkerModal}
      newWorkerData={newWorkerData}
      handleAddWorkerChange={handleAddWorkerChange}
      handleSaveWorker={handleSaveWorker}
      handleUpdateWorker={handleUpdateWorker}
      />
      {/* Add Modal End */}

      {/*Edit Modal Open */}
      <EditWorkerModal
      showEditWorkerModal={showEditWorkerModal}
      setShowEditWorkerModal={setShowEditWorkerModal}
      editWorkerData={editWorkerData}
      setEditWorkerData={setEditWorkerData}
      genderWorkData={genderWorkData}
      handleUpdateWorker={handleUpdateWorker}
      />
     
      {/*Edit Modal Close*/}

      <div className="mb-4">
        <Link
          className="btn btn-primary"
          to={''}
          onClick={() => setShowAddWorkerModal(true)}
        >
          Add Worker
        </Link>
      </div>
      <div className="mb-4">
        <Button
          variant="primary"
          onClick={viewSelectedUsers}
          disabled={selectedUsers.length === 0}
        >
          {selectedUsers.length === 0
            ? 'No users selected'
            : `${selectedUsers.length} user selected`}
        </Button>
      </div>
      {/* ... other code ... */}
      <Modal
        show={showSelectedUsersModal}
        onHide={() => setShowSelectedUsersModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Selected Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    {workerDetail ? ( // Check if workerDetail is defined
      <ul>
        {workerDetail.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
            <button
              className="btn btn-danger btn-sm ml-2"
              onClick={() => removeSelectedUser(user.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No users selected</p>
    )}
  </Modal.Body>
      </Modal>
      {/* ... other code ... */}
      {/* <div className="mb-4">
        <form onSubmit={onGetSearch}>
          <input
            type="text"
            placeholder="Search workers by name"
            value={search}
            onChange={(e) => onSearch(e)}
          />
          <Button type="submit" variant="primary">
            Reset
          </Button>
        </form>
        </div> */}
      <div className="mb-4">
        <form onSubmit={onGetSearch}>
          <input
            type="text"
            placeholder="Search workers by name"
            value={search}
            onChange={(e) => onSearch(e)}
          />
          <Button type="submit" variant="primary">
            Reset
          </Button>
        </form>
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
            {allWorker &&
              allWorker
                .filter((value) => {
                  if (search === '') {
                    return value;
                  } else if (
                    value.firstName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return value;
                  } else if (
                    value.lastName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return value;
                  } else {
                    return;
                  }
                })

                .map((wData, index) => (
                  <tr key={wData.id}>
                    <th scope="row">{wData.id}</th>
                    <td>{wData.firstName}</td>
                    <td>{wData.lastName}</td>
                    <td>{wData.age}</td>
                    <td>{wData.email}</td>
                    <td>{wData.phone}</td>
                    <td>{wData.gender}</td>
                    <td>
                      <img
                        src={wData.image || defaultImageUrl}
                        alt="Worker"
                        width="100"
                        height="100"
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => viewDataModal(wData)}
                      >
                        View
                      </Button>{' '}
                      <Button
                        variant="warning"
                        onClick={() => editWorkerModal(wData)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant="danger"
                        onClick={() => deleteWorkerClick(wData.id)}
                      >
                        Delete
                      </Button>
                      <Button
  variant={selectedUsers.includes(wData.id) ? 'success' : 'primary'}
  onClick={() => toggleSelectUser(wData.id)}
>
  {selectedUsers.includes(wData.id) ? 'Selected' : 'Select'}
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
