import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const NewViewModal = ({newDatashow,handleClose,userDetail}) => {
  return (
    <Modal show={newDatashow} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter"
    centered>
     <Modal.Header closeButton>
       <Modal.Title>User Details Of {userDetail && userDetail.name}</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <ul>
         <li> Name : {userDetail && userDetail.name}</li>
         <li> Phone : {userDetail && userDetail.phone}</li>
         <li> Email :{userDetail && userDetail.email}</li>
         <li> City : {userDetail && userDetail.address.city}</li>
       </ul>
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={handleClose}>
         Close
       </Button>
       <Button variant="primary" onClick={handleClose}>
         Save Changes
       </Button>
     </Modal.Footer>
   </Modal>
  )
}

export default NewViewModal