import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
  useParams,
} from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar> </NavigationBar>

      <Routes>
      <Route path="/favorites" element={<Favorites/>}/><Route/>
      <Route path="/login" element={<Login/>}/><Route/>
      <Route path="/register" element={<Register/>}/><Route/>
      <Route path="/search" element={<Search/>}/><Route/>
      <Route path="/user" element={<User/>}/><Route/>
      <Route path="/places" element={<Places/>}/><Route/>
      <Route path="/" element={<Welcome/>}/><Route/>
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


function NavigationBar() {
  const [searchInput, setSearchInput] = useState('');
  // const [places]
  const navigate = useNavigate();

  const handleOnClick = () => {
        navigate('/places', {state: {searchInput}});
  }
  return (
    <Nav
      // expand="true" fixed="top"
      // expand="true" fixed="bg-body- tertiary"
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
              onChange={(evt => setSearchInput(evt.target.value))}
              value={searchInput}
            />
          </Col>
          <Col xs="auto">
            <Button onClick={handleOnClick} type="submit">Search</Button>
          </Col>
        </Row>
      {/* </Form> */}

      <Nav.Item>
        <Link to="/register">Create Account</Link>
      </Nav.Item>

      <Nav.Item>
        <Link to="/login">Login</Link>
      </Nav.Item>

      <Nav.Item>
        <Link to="/">Home</Link>
      </Nav.Item>

      <Nav.Item>
        <Link to="/favorites">Favorites</Link>
      </Nav.Item>

      </Container>
    </Navbar>
    </Nav>
  );
}

export default App
