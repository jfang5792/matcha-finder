import { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Login from './Login';
import Register from './Register';
import Search from './Search';
import User from './User';
import Places from './Places';
import Favorites from './Favorites';

import {
  Link,
  Outlet,
  Route,
  Routes,
  useParams
} from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigationbar> </Navigationbar>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <Routes>
      <Route path="/" element={<Welcome/>}/><Route/>
      <Route path="Login" element={<Login/>}/><Route/>
      <Route path="Register" element={<Register/>}/><Route/>
      <Route path="Search" element={<Search/>}/><Route/>
      <Route path="User" element={<User/>}/><Route/>
      <Route path="Places" element={<Places/>}/><Route/>
      <Route path="Favorites" element={<Favorites/>}/><Route/>
      </Routes>

    </>
  )
}

function Welcome() {
  return (
    <div>
      <h1>Welcome, this is the homepage!</h1>
    </div>
  )
}

function Navigationbar() {
  return (
    <Nav
      // expand="true" fixed="top"
      // expand="true" fixed="bg-body-tertiary"
      expand="lg" fixed="bg-body-tertiary"
      // expand="lg" className="bg-body-tertiary"

      style={{"backgroundColor": "#65e28f", "width": "100%"}}
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`
      )
    }

    >
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <i className="bi bi-cup-fill"></i>
      <Navbar.Brand href="/">Matcha Finder</Navbar.Brand>

      {/* <Form inline> */}
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="type 'matcha' + location"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      {/* </Form> */}

      <Nav.Item>
        <Link to="/register">Create Account</Link>

      </Nav.Item>

      <Nav.Item>
        <Link to="/login">Login</Link>
      </Nav.Item>

      <div>
        <Link to="/">Home</Link>
      </div>

      <Nav.Item>

      </Nav.Item>
      </Container>
    </Navbar>
    </Nav>
  );
}

export default App
