import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const AddModal = ({newAddDatashow, setnewAddDatashow, addUserName, setaddUserName, addUserEmail, setaddUserEmail, addUserPhone, setaddUserPhone, errAddUser, addUser}) => {
  return (
    <Modal
      show={newAddDatashow}
      onHide={()=> setnewAddDatashow(false)}
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
      <form>
  <div className="mb-3">
    <label className="form-label">Name </label>
    <input type="text" className="form-control" id="username" name="username" value={addUserName} onChange={(e) => setaddUserName(e.target.value)}  />
    
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" id="useremail" name="useremail" value={addUserEmail} onChange={(e) =>setaddUserEmail(e.target.value) }  />
    
  </div>
  
  <div className="mb-3">
    <label className="form-label">Phone </label>
    <input type="email" className="form-control" id="phone" name="phone" value={addUserPhone} onChange={(e) =>setaddUserPhone(e.target.value) }  />
    
  </div>
 
</form> 
      </Modal.Body>
      <Modal.Footer>
      <div>
            <p style={{ color: 'red', fontSize: '16px' }}>{errAddUser}</p>
          </div>
        <Button variant="secondary" onClick={() => setnewAddDatashow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={addUser}>
         Save Changes
       </Button>
         
      </Modal.Footer>
    </Modal>
  )
}

export default AddModal