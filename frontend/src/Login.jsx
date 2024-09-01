import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (evt) => {
        evt.preventDefault();
        console.log("Login data:", email, password);
        try {
            const res = await fetch(`/api/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {"Content-Type": "application/json"},
            });
            const data = await res.json();
            if (data.status === "Ok") {
                props.toggleLoginCallback && props.toggleLoginCallback(true);
                setMessage("Log in successful! Loading your Favorites page now (if none, start searching!).");
                await new Promise(resolve => setTimeout(resolve, 4000));
                navigate('/favorites');
            } else {
                setMessage(data.msg);
            }
        } catch (err) {
            console.error("Login Unsuccessful:", err);
            setMessage("The email or password you entered was incorrect. Try again or create an account.");
        }
    }

    return (
        <div className='login-body'>
            <Card>
                <Card.Title><h3 className="loginAccount">Log in below: </h3></Card.Title>
                    {message}
                    <form onSubmit={handleLogin}>
                        <ul><p className="emailPadding"><i className="bi bi-envelope-check-fill"></i> Email: <input type="text" name="email" onChange={(evt) => setEmail(evt.target.value)} value={email}></input></p></ul>
                        <ul><p>Password: <input type="password" name="password" onChange={(evt) => setPassword(evt.target.value)} value={password}></input></p></ul>
                        <ul><p><Button onClick={handleLogin} className="loginBtn" type="submit">Submit</Button></p></ul>
                        {/* <ul><p><input className="loginBtn" type="submit"></input></p></ul> */}
                    </form>
            </Card>
        </div>
    )
}
