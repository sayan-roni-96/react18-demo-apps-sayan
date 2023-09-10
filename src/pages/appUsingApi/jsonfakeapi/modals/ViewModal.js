import React from 'react';

import { Button, Modal } from 'react-bootstrap';
// Child Component
const ViewModal = ({ showViewModal, handleClose, viewSingleUser }) => {
  // console.log('props==>', props);
  // const { showViewModal } = props;
  return (
    <Modal
      show={showViewModal}
      onHide={handleClose}
      backdrop="static"
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
  );
};

export default ViewModal;
