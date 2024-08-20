import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import firstBackgroundImage from './assets/background.png';

import {
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Login from './Login';
import Register from './Register';
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
      <h2>Welcome, this is the homepage!</h2>
      {/* <img
        src={firstBackgroundImage}
      /> */}
    </div>
  )
}


function NavigationBar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleOnClick = () => {
        navigate('/places', {state: {searchInput}});
  }
  return (
    <Nav
      style={{"backgroundColor": "#65e28f", "width": "100%"}}
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`
      )
    }

    >
    {/* <Navbar expand="lg" className="bg-body-tertiary"> */}
    {/* <Card> */}
    <Navbar className="navbar navbar-expand-lg navbar-light navbar-fixed-top">
      <Container fluid>
      <Navbar.Brand href="/">Matcha Finder  <i className="bi bi-house"></i></Navbar.Brand>

        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="matcha & location"
              className="mr-sm-2"
              onChange={(evt => setSearchInput(evt.target.value))}
              value={searchInput}
            />
          </Col>
          <Col xs="auto">
            <Button onClick={handleOnClick} type="submit">Search</Button>
          </Col>
        </Row>

        <Nav.Item>
          <Link to="/register">Create Account</Link>
        </Nav.Item>

        <Nav.Item>
          <Link to="/login">Login</Link>
        </Nav.Item>

        <Nav.Item>
          <Link to="/favorites">Favorites <i className="bi bi-suit-heart"></i> </Link>
        </Nav.Item>

      {/* </Navbar.Brand> */}
      </Container>
    </Navbar>
    {/* </Card> */}
  </Nav>
  );
}

export default App
