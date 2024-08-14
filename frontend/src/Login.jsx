import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const handleLogin = (evt) => {
        evt.preventDefault()
        console.log("Login data:", email, password)
        fetch(`/api/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-Type": "application/json"},
        })
        .then((res) => {return res.json()})
        .then((data) => {
            console.log("DATA:", data)
            // setMessage(data.msg)
            if(data.status === "Ok") {
                navigate('/favorites');
            }
            setMessage(data.msg)
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <div>
                {message}
                <form onSubmit={handleLogin}>
                    <p>Email<input type="text" name="email" onChange={(evt) => setEmail(evt.target.value)} value={email}></input></p>
                    <p>Password<input type="password" name="password" onChange={(evt) => setPassword(evt.target.value)} value={password}></input></p>
                    <p><input type="submit"></input></p>
                </form>
            </div>
        </div>
    )
}
