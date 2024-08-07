
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Register() {
    return (
        <div>
            <h1>Create Account Here:</h1>
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
