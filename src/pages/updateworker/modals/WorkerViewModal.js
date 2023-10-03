
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const WorkerViewModal = ({newDataview,handleClose,workerDetail}) => {
  return (
    <Modal show={newDataview} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter"
    centered>
     <Modal.Header closeButton>
     <Modal.Title>User Details Of {workerDetail && `${workerDetail.firstName} ${workerDetail.lastName}`}</Modal.Title>
     </Modal.Header>
     <Modal.Body>
     <div className="d-flex justify-content-center mb-3">
          <img
            src={workerDetail && workerDetail.image}
            alt="User Image"
            width="150"
            height="150"
          />
        </div>
       <ul>
         <li> User ID : {workerDetail && workerDetail.id}</li>
         <li> Name : {workerDetail && `${workerDetail.firstName} ${workerDetail.lastName}`}</li>
         <li> Age : {workerDetail && workerDetail.age}</li>
         <li> Gender : {workerDetail && workerDetail.gender}</li>
        </ul>  
        <h3>Contact Details</h3>   
         <ul>
         <li> Phone : {workerDetail && workerDetail.phone}</li>
         <li> Email : {workerDetail && workerDetail.email}</li>
         </ul> 
         {/* <li> City : {userDetail && userDetail.address.city}</li> */}
     
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

export default WorkerViewModal