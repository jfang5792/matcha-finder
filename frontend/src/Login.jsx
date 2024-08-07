// import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import {
//     Link,
//     redirect,
//     useNavigate,
//     useParams
//   } from "react-router-dom";

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <div>
                <form>
                    <p>Email<input type="text" name="email"></input></p>
                    <p>Password<input type="password" name="password"></input></p>
                    <p><input type="submit"></input></p>
                </form>
            </div>
        </div>
    )
}
