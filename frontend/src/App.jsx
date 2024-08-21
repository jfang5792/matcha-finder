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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavigationBar isLoggedIn={isLoggedIn} setLoggedOut={() => setIsLoggedIn(false)}> </NavigationBar>

      <Routes>
      <Route path="/favorites" element={<Favorites/>}/><Route/>
      <Route path="/login" element={<Login toggleLoginCallback={setIsLoggedIn}/>}/><Route/>
      <Route path="/register" element={<Register/>}/><Route/>
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


function NavigationBar(props) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/places', {state: {searchInput}});
  }

  const handleRegistration = () => {
    navigate('/register')
  }

  const handleLogin = () => {
    if(props.isLoggedIn) {
      fetch(`/api/logout`, {
        method: "POST",
      })
      .then(() => props.setLoggedOut())
      .then(() => navigate('/login'))
    } else {
      navigate('/login')
    }
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
    <Navbar className="navbar navbar-expand-lg navbar-light navbar-fixed-top">
      <Container fluid>
      <Navbar.Brand href="/"><i className="bi bi-house-fill">  </i>MATCHA FINDER  </Navbar.Brand>

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
            <Button onClick={handleOnClick} type="submit">SEARCH <i className="bi bi-search"></i> </Button>
          </Col>
        </Row>

        <Nav.Item className="mx-1">
          <Button onClick={handleRegistration} type="submit">REGISTER </Button>
        </Nav.Item>

        <Nav.Item className="mx-1">
        <Button onClick={handleLogin} type="submit">{props.isLoggedIn ? 'LOGOUT': 'LOGIN'}</Button>
        </Nav.Item>

        <Nav.Item>
          <Link to="/favorites"><i className="bi bi-suit-heart-fill"></i> </Link>
        </Nav.Item>

      </Container>
    </Navbar>
  </Nav>
  );
}

export default App
