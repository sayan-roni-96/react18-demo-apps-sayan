import React, { useState } from 'react';

const MainTodo = () => {
  // const [data, callback] = useState(type);
  const [allTodos, setAllTodos] = useState([]);
  const [todoData, setTodoData] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  console.log('todoData->', typeof todoData, todoData);

  const onButtonClick = () => {
    // console.log('onButtonClick');
    if (!todoData || todoData === '') {
      setErrorMsg('Please fill the field!');
      setTimeout(() => {
        setErrorMsg('');
      }, 1000);
    } else {
      const newTodos = {
        todo: todoData,
      };
      setAllTodos([...allTodos, newTodos]);
      setTodoData('');
    }
  };

  console.log('allTodos->', allTodos);

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
            name="todotxt"
            id="todotxt"
            value={todoData}
            className="form-control"
            style={{ width: '40%', padding: '6px', fontSize: '20px' }}
            onChange={(evt) => setTodoData(evt.target.value)}
          />
          &nbsp;
          <button
            style={{
              fontSize: '25px',
              backgroundColor: 'green',
              color: 'white',
              width: '20%',
            }}
            type="buttom"
            onClick={onButtonClick}
          >
            Add
          </button>
        </div>
        <div>
          <p style={{ color: 'red', fontSize: '16px' }}>{errorMsg}</p>
        </div>
        <div>
          <h2>Todo List</h2>
          {allTodos.length == 0 ? (
            <div>
              <h3>No todo found!</h3>
            </div>
          ) : (
            <table style={{ margin: '0 auto', width: '30%' }}>
              <thead>
                <th>Sl.No</th>
                <th>Todo Nme</th>
                <th>Action</th>
              </thead>
              {allTodos &&
                allTodos.map((eTodo, index) => {
                  console.log('eTodo->', eTodo);
                  return (
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{eTodo.todo}</td>
                        <td>
                          <button
                            style={{
                              backgroundColor: 'blue',
                              color: '#fff',
                              fontSize: '18px',
                            }}
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
