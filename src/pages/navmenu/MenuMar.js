import React from 'react';
import { Container, Dropdown, Nav, NavDropdown, Navbar } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import {button} from 'bootstrap'

const MenuBar = () => {
  return (
    <>
      <div>
        <Navbar bg="warning" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">My Apps</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <Dropdown.Item href="/practodo">Practice Todo</Dropdown.Item>
                <Dropdown.Item href="/counter">Small Counter</Dropdown.Item>
                <Dropdown.Item href="/calculator">
                  Small Calculator
                </Dropdown.Item>
                <Dropdown.Item href="/userlist">
                  User List Fake Json Server
                </Dropdown.Item>
                <Dropdown.Item href="/newuserlist">
                  New User List Fake Json Server
                </Dropdown.Item>
                <Dropdown.Item href="/alluser">
                  All List Without Modal Fake Json Server
                </Dropdown.Item>
                <Dropdown.Item href="/employeelist">
                  CRUD Using Json Server
                </Dropdown.Item>
                <Dropdown.Item href="/studentlist">
                  CRUD Student Using Json Server
                </Dropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default MenuBar;
