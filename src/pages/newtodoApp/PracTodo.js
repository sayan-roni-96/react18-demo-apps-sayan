import React, { Fragment, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

function PracTodo() {
  const [todos, setTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState('')
  const [newName, setNewName] = useState('');
  const [newAbout, setNewAbout] = useState('');
  const [newViewData, setViewData] = useState('');

  {/*this is for edit*/ }
  const [editTodoName, setEditTodoName] = useState('');
  const [editTodoAbout, setEditTodoAbout] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [errorMsgEdit, setErrorMsgEdit] = useState('');

  const addProfile = () => {
    if (newName !== '' || newAbout !== '') {
      const newProfileTodo = {
        todoId: Date.now(),
        todoName: newName,
        todoAbout: newAbout
      }
      console.log('newProfileTodo->', newProfileTodo)
      setTodos([...todos, newProfileTodo]);
      setNewName('');
      setNewAbout('');
    } else {
      setErrorMsg('Please fill the field!');
      setTimeout(() => {
        setErrorMsg('');
      }, 1000);
    }
  };
  //console.log('todos->',todos)
  const viewDataclick = (viewData) => {
    //console.log('viewData=>',viewData)
    setViewData(viewData);
    setTimeout(() => {
      setViewData('');
    }, 5000)
  }
  //console.log('newViewData=>',newViewData)

  {/*Delete Function*/ }
  const deleteDataclick = (deleteID) => {
    if (window.confirm('Do you want to Delete Data ?')) {
      //console.log('deleteID=>',deleteID)
      const deleteData = [...todos].filter((dedata, delDid) => {
        return dedata.todoId != deleteID;
      })
      setTodos(deleteData);
    }
  };
  {/*Delete Function*/ }

  {/* Edit Function*/ }
  const editDataClick = (editDataClk) => {
    console.log('editDataClk->', editDataClk);
    // setEditTodoId(editDataClk.todoId);
    // setEditTodoName(editDataClk.todoName
    // );
    // setEditTodoAbout(editDataClk.todoAbout)

        if (window.confirm('Do you want to Edit Data ?')) {
          setEditTodoId(editDataClk.todoId);
          setEditTodoName(editDataClk.todoName);
          setEditTodoAbout(editDataClk.todoAbout)
          console.log('editTodoName->',editTodoName)
     }
  };

  useEffect(()=>{console.log(editTodoName,editTodoId,editTodoAbout,todos,'set data')},[editTodoName,editTodoId,editTodoAbout])
  {/*Edit Submit */ }
  const editDataSubmit = () => {
    if (!editTodoName || !editTodoAbout) {
      setErrorMsg("Please Filed The Fields")
    } else {
      const updatedTodo = [...todos].map((dataTodo) => {
        console.log('dataTodo=>', dataTodo)
        if (editTodoId == dataTodo.todoId) {
          dataTodo.todoName = editTodoName;
          dataTodo.todoAbout = editTodoAbout;
        }
        console.log('editTodoName->', editTodoName)
        return dataTodo;
      })
      setTodos(updatedTodo);
      editDataCancel();
    }
  };

  {/*Cancel Button */ }
  const editDataCancel = () => {
    setEditTodoName('');
    setEditTodoAbout('');
    setEditTodoId(null);
  };


  return (
    <div className="container mt-5">

      <div className="row justify-content-center">
        <div className="col-sm-4">

          <h1 className="mb-4">Todo List</h1>
          <div className="input-group mb-3">
            <input
              style={{ width: "20%", marginleft: '24px' }}
              type="text"
              className="form-control"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              style={{ width: "20%", marginleft: '24px' }}
              type="text"
              className="form-control"
              placeholder="About"
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
            />
            <div className="input-group-append ml-2">
              <button className="btn btn-primary" type="button" onClick={addProfile}>
                Add
              </button>
            </div>
          </div>
          <div>
            <p style={{ color: 'red', fontSize: '16px' }}>{errorMsg}</p>
          </div>
          { /* VIEW DATA LIST */}
          { /* ekhane newViewData ekta object tai === ba == bosano jbe na tai ekhane ! bosate hbe */}
          {
            !newViewData ? (<></>) : (
              <div className="view_div">
                <h2>View Specific Data</h2>
                <h4>Name: {newViewData.todoName}</h4>
                <h5>About:{newViewData.todoAbout}</h5>
              </div>
            )
          }
          {/*END VIEW DATA LIST*/}
          {/* For edit error msg */}
          <h4 style={{ color: 'red' }}>{errorMsgEdit}</h4>
          <h2>Todo List</h2>
          {todos.length == 0 ? (
            <div>
              <h2>No Data Found!</h2>
            </div>
          ) : (
            <table style={{ margin: '0 auto', width: '70%' }}>
              <thead>
                <th>Sl.No</th>
                <th>Name</th>
                <th>About</th>
                <th>Action</th>
              </thead>
              {todos.map((todo, index) => (
                <tr>
                  <td>{index + 1}.</td>
                  {editTodoId === todo.todoId ? (
                    <td><input
                      style={{ width: "100%", marginleft: '24px' }}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={editTodoName}
                      onChange={(ev) => setEditTodoName(ev.target.value)}
                    />
                      <input
                        style={{ width: "100%", marginleft: '24px' }}
                        type="text"
                        className="form-control"
                        placeholder="About"
                        value={editTodoAbout}
                        onChange={(ev) => setEditTodoAbout(ev.target.value)}
                      /></td>
                  ) : (
                    <> <td>{todo.todoName}</td>
                      <td>{todo.todoAbout}</td>
                    </>
                  )
                  }
                  {editTodoId === todo.todoId ? (<td>
                    <button
                      style={{
                        backgroundColor: 'green',
                        color: '#fff',
                        fontSize: '18px',
                      }}
                      onClick={() => editDataSubmit()}
                    >
                      Edit Submit
                    </button>{' '}
                    <button
                      style={{
                        backgroundColor: 'red',
                        color: '#fff',
                        fontSize: '18px',
                      }}
                      onClick={() => editDataCancel()}
                    >
                      Cancel
                    </button>
                  </td>) : (<td><button
                    style={{
                      backgroundColor: 'blue',
                      color: '#fff',
                      fontSize: '18px',
                    }}
                    onClick={() => viewDataclick(todo)}
                  >
                    View
                  </button>
                    &nbsp;
                    <button
                      style={{
                        backgroundColor: 'yellow',
                        color: '#000',
                        fontSize: '18px',
                      }}
                      onClick={() => editDataClick(todo)}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      style={{
                        backgroundColor: 'red',
                        color: '#fff',
                        fontSize: '18px',
                      }}
                      onClick={() => deleteDataclick(todo.todoId)}
                    >
                      Delete
                    </button></td>)}
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>


    </div>
  );
}

export default PracTodo;



