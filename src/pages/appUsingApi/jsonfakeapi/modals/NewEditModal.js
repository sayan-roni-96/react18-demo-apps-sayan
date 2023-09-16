import React from 'react'
import { Button, Modal } from 'react-bootstrap'


const NewEditModal = ({newEditDatashow,editHandleClose,editUserName,setEditUserName,editUserPhone
    ,setEditUserPhone,editUserEmail,setEditUserEmail,editUserCity,setEditUserCity,editUserDataCancel
,editUserSubmit}) => {
  return (
    <Modal show={newEditDatashow} onHide={editHandleClose}  aria-labelledby="contained-modal-title-vcenter"
    centered>
     <Modal.Header closeButton>
       <Modal.Title>Edit User Details</Modal.Title>
     </Modal.Header>
     <Modal.Body>
           <><div className='editmodalinp'>Name: <input
                 style={{ width: "50%", marginleft: '24px' }}
                 type="text"
                 className="form-control"
                 placeholder="Name"
                 value={editUserName}
                 onChange={(ev) => setEditUserName(ev.target.value)}
                /></div>
              <div className='editmodalinp'> Phone :<input
                 style={{ width: "50%", marginleft: '24px' }}
                 type="text"
                 className="form-control"
                 placeholder="Phone"
                 value={editUserPhone}
                 onChange={(ev) => setEditUserPhone(ev.target.value)}
                /></div>
                <div className='editmodalinp'> Email :<input
                     style={{ width: "50%", marginleft: '24px' }}
                     type="email"
                     className="form-control"
                     placeholder="Email"
                     value={editUserEmail}
                     onChange={(ev) => setEditUserEmail(ev.target.value)}
                   />
                </div>
               {/* <div className='editmodalinp'> City: <input
                     style={{ width: "50%", marginleft: '24px' }}
                     type="text"
                     className="form-control"
                     placeholder="City"
                     value={editUserCity}
                     onChange={(ev) => setEditUserCity(ev.target.value)}
                   />
                   </div> */}
                   </>    
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={editUserDataCancel}>
         Close
       </Button>
       <Button variant="primary" onClick={() => editUserSubmit()}>
         Save Changes
       </Button>
     </Modal.Footer>
   </Modal>
  )
}

export default NewEditModal