import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const AddModal = ({addUserPhone,setaddUserName,addUserName,addHandleClose,newAddDatashow,setaddUserPhone,addUserEmail
,setaddUserEmail,addUser}) => {
  return (
    <Modal
      show={newAddDatashow}
      onHide={addHandleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Add User Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <><div className='editmodalinp'>Name: <input
                 style={{ width: "50%", marginleft: '24px' }}
                 type="text"
                 className="form-control"
                 placeholder="Name"
                 value={addUserName}
                 onChange={(ev) => setaddUserName(ev.target.value)}
                /></div>
              <div className='editmodalinp'> Phone :<input
                 style={{ width: "50%", marginleft: '24px' }}
                 type="text"
                 className="form-control"
                 placeholder="Phone"
                 value={addUserPhone}
                 onChange={(ev) => setaddUserPhone(ev.target.value)}
                /></div>
                <div className='editmodalinp'> Email :<input
                     style={{ width: "50%", marginleft: '24px' }}
                     type="email"
                     className="form-control"
                     placeholder="Email"
                     value={addUserEmail}
                     onChange={(ev) => setaddUserEmail(ev.target.value)}
                   />
                </div>
               {/* <div className='editmodalinp'> City: <input
                     style={{ width: "50%", marginleft: '24px' }}
                     type="text"
                     className="form-control"
                     placeholder="City"
                     value={addUserCity}
                     onChange={(ev) => setaddUserCity(ev.target.value)}
                   />
                   </div> */}
                   </> 
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button variant="primary" onClick={addUser}>
         Save Changes
       </Button>
          {/* <div>
            <p style={{ color: 'red', fontSize: '16px' }}>{errorUserMsg}</p>
          </div> */}
      </Modal.Footer>
    </Modal>
  )
}

export default AddModal