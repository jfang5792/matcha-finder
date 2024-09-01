import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import phrase from './assets/phrase.jpg';

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();
    const handleRegistration = (evt) => {
        evt.preventDefault()
        console.log("Creating account..", email, password)
        fetch(`/api/register`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {"Content-Type": "application/json"},
        })
        .then((res) => {return res.json()})
        .then((data) => {
            console.log("NEW_ACCOUNT DATA:", data)
            if(data.status === "Ok") {
                setUserId(data.userId)
                setMessage("Account successfully created. Loading the login page now.")
                setTimeout(() => {
                    navigate('/login');
                }, 4000)
                // alert("Account successfully created. Loading the login page now.")
            } else {
                setErrorMessage(data.status.msg)
            }
        })
        .catch((err) => {
            console.error("Account not created.", err);
            setMessage("Account with that email already exists. Please log in.");
        })
    }
    return (
        <div className="registerItems">
            <img className="phraseCard" variant="top" src={phrase} alt="phraseImage"/>
            <h3 className="createAccount">   Create Account Here:</h3>
            <div>
                {message}
                <form className="registerForm" onSubmit={handleRegistration}>
                    <div className="regForm"><i className="bi bi-envelope-check-fill"></i> Email:  <input type="text" name="email" onChange={(evt) => setEmail(evt.target.value)} value={email}></input></div>
                    <ul><div className="regForm"> Password:  <input type="password" name="password" onChange={(evt) => setPassword(evt.target.value)} value={password}></input></div></ul>
                    <ul><p><Button onClick={handleRegistration} className="regBtn" type="submit">Submit</Button></p></ul>
                    {/* <div className='regSubmitBtn'><ul><input className="regBtn" type="submit"></input></ul></div> */}
                </form>
            </div>
        </div>
    )
}
