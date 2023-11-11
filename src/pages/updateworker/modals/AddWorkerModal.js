import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const AddWorkerModal = ({showAddWorkerModal,setShowAddWorkerModal,newWorkerData,handleAddWorkerChange,handleSaveWorker}) => {
  return (
    <Modal
        show={showAddWorkerModal}
        onHide={() => setShowAddWorkerModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="firstName">
              {' '}
              {/* Change 'name' to 'firstName' */}
              <Form.Label>First Name</Form.Label>{' '}
              {/* Change 'Name' to 'First Name' */}
              <Form.Control
                type="text"
                name="firstName"
                value={newWorkerData.firstName}
                onChange={handleAddWorkerChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              {' '}
              {/* Add 'lastName' */}
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
          <Button
            variant="secondary"
            onClick={() => setShowAddWorkerModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveWorker}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default AddWorkerModal