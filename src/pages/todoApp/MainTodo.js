import React, { useState } from 'react';
import './todo.css';

const MainTodo = () => {
  // const [data, callback] = useState(type);
  const [allTodos, setAllTodos] = useState([]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [viewTodoData, setViewTodoData] = useState();

  const onButtonClick = () => {
    if (subject === '' || description === '') {
      setErrorMsg('Please fill the field!');
      setTimeout(() => {
        setErrorMsg('');
      }, 1000);
    } else {
      const newTodos = {
        todoId: Date.now(),
        todoSubject: subject,
        todoDescription: description,
      };
      console.log('newTodos->', newTodos);
      setAllTodos([...allTodos, newTodos]);
      // After add todo then field will be blank
      setSubject('');
      setDescription('');
    }
  };

  // console.log('subject-des->', subject, description);

  console.log('allTodos->', allTodos);

  const viewClick = (ViewData) => {
    // console.log('ViewData->', ViewData);
    setViewTodoData(ViewData);

    setTimeout(() => {
      setViewTodoData();
    }, 2000);
  };

  const deleteClick = (dId) => {
    console.log('dId->', dId);
    if (window.confirm('Do you want to delete?')) {
      const removeTodo = [...allTodos].filter((fData, indx) => {
        console.log('deleteClick-Data->', fData);
        console.log('deleteClick-Indx->', fData.todoId !== dId);
        return fData.todoId !== dId;
      });
      setAllTodos(removeTodo);
    }
  };

  // console.log('viewTodoData->', viewTodoData);

  return (
    <>
      <div className="container">
        <h1 style={{ color: 'red' }}>Todo App</h1>
        <div
          className="row"
          style={{ marginBottom: '20px', justifyContent: 'center' }}
        >
          <input
            type="text"
            name="todoSubject"
            id="todoSubject"
            placeholder="Subject"
            value={subject}
            className="form-control"
            style={{ width: '40%', padding: '6px', fontSize: '20px' }}
            onChange={(evt) => setSubject(evt.target.value)}
          />{' '}
          &nbsp;
          <input
            type="text"
            name="todoDescription"
            id="todoDescription"
            placeholder="Description"
            value={description}
            className="form-control"
            style={{ width: '40%', padding: '6px', fontSize: '20px' }}
            onChange={(evt) => setDescription(evt.target.value)}
          />
          &nbsp;
          <button
            style={{
              fontSize: '25px',
              backgroundColor: 'green',
              color: 'white',
              width: '20%',
              marginTop: '10px',
            }}
            type="buttom"
            onClick={onButtonClick}
          >
            Add
          </button>
          <div>
            <p style={{ color: 'red', fontSize: '16px' }}>{errorMsg}</p>
          </div>
        </div>

        {/* View Todo Html */}
        {!viewTodoData ? (
          <></>
        ) : (
          <div className="view_div">
            <h2>View Specific Todo</h2>
            <h4>Subject: {viewTodoData.todoSubject}</h4>
            <h5>Subject: {viewTodoData.todoDescription}</h5>
          </div>
        )}
        {/* View Todo Html End*/}

        <div>
          <h2>Todo List</h2>
          {allTodos.length == 0 ? (
            <div>
              <h3>No todo found!</h3>
            </div>
          ) : (
            <table style={{ margin: '0 auto', width: '70%' }}>
              <thead>
                <th>Sl.No</th>
                <th>Todo Subject</th>
                <th>Todo Description</th>
                <th>Action</th>
              </thead>
              {allTodos &&
                allTodos.map((eTodo, index) => {
                  console.log('eTodo->', eTodo);
                  return (
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{eTodo.todoSubject}</td>
                        <td>{eTodo.todoDescription}</td>
                        <td>
                          <button
                            style={{
                              backgroundColor: 'blue',
                              color: '#fff',
                              fontSize: '18px',
                            }}
                            onClick={() => viewClick(eTodo)}
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
                            onClick={() => deleteClick(eTodo.todoId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default MainTodo;
