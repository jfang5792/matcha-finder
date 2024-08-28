import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
            setMessage(data.msg)
            if(data.status === "Ok") {
                setEmail(data.email)
                setUserId(data.userId)
                navigate('/login');
            } else {
                setErrorMessage(data.status.msg)
            }
            // if(data.status !== "Ok") {
            //     setErrorMessage(data.status.msg)
            // } else {
            //     // setMessage(data.msg)
            //     setEmail(data.email)
            //     // setUserId(data.userId)
            //     navigate('/login');
            //     return "Account successfully created"
            // }
        })
    }
    return (
        <div className="registerItems">
            <img className="phraseCard" variant="top" src={phrase} alt="phraseImage"/>
            <h3 className="createAccount">   Create Account Here:</h3>
            <div>
                {message}
                <form className="registerForm" onSubmit={handleRegistration}>
                    <div className="regForm"> Email  <input type="text" name="email" onChange={(evt) => setEmail(evt.target.value)} value={email}></input></div>
                    <ul><div className="regForm"> Password  <input type="password" name="password" onChange={(evt) => setPassword(evt.target.value)} value={password}></input></div></ul>
                    <div className='regSubmitBtn'><ul><input className="regBtn" type="submit"></input></ul></div>
                </form>
            </div>
        </div>
    )
}
