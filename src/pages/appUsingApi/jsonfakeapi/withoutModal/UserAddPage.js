import React, { useState } from 'react';

const UserAddPage = ({ addUser }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const newHandleSubmit = (e) => {
    e.preventDefault();

    // Create a new user object
    const newUser = {
      name,
      phone,
      email,
    };

    // Add the new user to the user list
    addUser(newUser);

    // Clear the input fields
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="container mt-5">
      <h1>Add User</h1>
      <form onSubmit={newHandleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};


export default UserAddPage