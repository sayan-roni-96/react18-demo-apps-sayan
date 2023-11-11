import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

const EditWorkerModal = ({
    showEditWorkerModal,
    setShowEditWorkerModal,
    editWorkerData,
    setEditWorkerData,
    genderWorkData,
    handleUpdateWorker
  }) => {
    return (
    <Modal
        show={showEditWorkerModal}
        onHide={() => setShowEditWorkerModal(false)}
      >
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
            <Form.Group controlId="ephone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="ephone"
                value={editWorkerData.ephone}
                onChange={(e) => {
                  setEditWorkerData({
                    ...editWorkerData,
                    ephone: e.target.value, // Update eage separately
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="egender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
              value={editWorkerData.egender}
              onChange={(e) => {
                setEditWorkerData({
                  ...editWorkerData,
                  egender: e.target.value,
                });
              }}
            >
              <option value="">--Select One--</option>
              {genderWorkData.map((gData, i) => {
                return (
                  <option key={gData.id} value={gData.value}>
                    {gData.name}
                  </option>
                );
              })}
            </Form.Select>
            </Form.Group>
            <Form.Group controlId="eimage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="eimage"
                  value={editWorkerData.eimage}
                  onChange={(e) => {
                    setEditWorkerData({
                      ...editWorkerData,
                      eimage: e.target.value,
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
          <Button
            variant="secondary"
            onClick={() => setShowEditWorkerModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateWorker}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    
    );
};

export default EditWorkerModal