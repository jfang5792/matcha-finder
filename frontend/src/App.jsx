import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import background from './assets/background.png';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Login from './Login';
import Register from './Register';
import Places from './Places';
import Favorites from './Favorites';

import { Route, Routes } from "react-router-dom"; // Link, useParams


function App() {
  // const [count, setCount] = useState(0) //for ratings later
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
    <div className='homepage'>
     <ul><h2 className="welcomePhrase">Welcome, this is the homepage. </h2></ul>
     <ul><h3 className="welcomeh2Phrase">Start your quest to find matcha 🍵! </h3></ul>
    </div>
  )
}

function NavigationBar(props) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleOnClick = () => {navigate('/places', {state: {searchInput}});}
  const handleRegistration = () => {navigate('/register')}
  const handleFav = () => {navigate('/favorites')}
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
      //"#65e28f"
      style={{"backgroundColor": "#e2d1c3", "justifyContent": "center"}}
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`
      )
    }
    >
      <img
        src={background}
        className="navbar-banner"
      />
    <Navbar className="navbar navbar-expand-lg navbar-light navbar-fixed-top">
      <Container fluid>
      <Navbar.Brand href="/"><i className="bi bi-house-fill">  </i>MATCHA FINDER
      </Navbar.Brand>

        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="MATCHA & LOCATION"
              className="search-input"
              onChange={(evt => setSearchInput(evt.target.value))}
              value={searchInput}
            />
          </Col>
          </Row>
          <Button onClick={handleOnClick} type="submit"><i className="bi bi-search"></i> </Button>
          {/* <Col xs="auto">
          </Col> */}
        <Nav.Item className="mx-2">
        <Button onClick={handleFav} type="submit">FAVORITES </Button>
        </Nav.Item>

        <Nav.Item className="mx-2">
          <Button onClick={handleRegistration} type="submit">REGISTER </Button>
        </Nav.Item>

        <Nav.Item className="mx-2">
        <Button onClick={handleLogin} type="submit">{props.isLoggedIn ? 'LOGOUT': 'LOGIN'}</Button>
        </Nav.Item>
            {/* login <i className="bi bi-person-check-fill"></i> */}
            {/* logout <i className="bi bi-person-dash-fill"></i> */}
      </Container>
    </Navbar>
  </Nav>
  );
}

export default App
