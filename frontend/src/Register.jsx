import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    // const [userId, setUserId] = useState("")

    const navigate = useNavigate();
    const handleRegistration = (evt) => {
        evt.preventDefault()
        console.log("Creating account..")
        console.log(email)
        console.log(password)
        fetch(`/api/register`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-Type": "application/json"},
        })
        .then((res) => {return res.json()})
        .then((data) => {
            console.log("NEW_ACCOUNT DATA:", data)
            setMessage(data.msg)
            if(data.status === "Ok") {
                setEmail(data.email)
                navigate('/login');
            } else {
                setErrorMessage(data.status.msg)
            }
        })
    }
    return (
        <div>
            <h1>Create Account Here:</h1>
            <div>
                {message}
                <form onSubmit={handleRegistration}>
                    <p>Email<input type="text" name="email" onChange={(evt) => setEmail(evt.target.value)} value={email}></input></p>
                    <p>Password<input type="password" name="password" onChange={(evt) => setPassword(evt.target.value)} value={password}></input></p>
                    <p><input type="submit"></input></p>
                </form>
            </div>
        </div>
    )
}
