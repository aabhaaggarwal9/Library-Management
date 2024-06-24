import { useState } from "react";
import { loginAPI } from "../../Service/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";

export const LoginPage = () => {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [httpError, setHttpError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (usernameOrEmail === '' || password === '') {
            setHttpError("Please fill required fields");
        }
        else {
            const loginPayload = {
                usernameOrEmail: usernameOrEmail,
                password: password
            }

            loginAPI(loginPayload).then((response: any) => {
                login();
                navigate("/");
                setHttpError("");
            }).catch((error: any) => {
                console.log("error", error);
                if (error.response.status === 401) {
                    setHttpError("Invalid credentials");
                }
                else {
                    setHttpError(error.message);
                }
            })
        }
    }

    return (
        <div className="card container shadow-lg mt-5 mb-5" style={{ width: "25rem" }}>
            <div className="card-header fs-5 text-center mb-2">
                BookWorm
            </div>
            <div className="card-body">
                <h1 className="card-title text-center mb-5">Sign In</h1>
                {
                    httpError !== "" &&
                    <div className="alert alert-danger" role="alert">
                        {httpError}
                    </div>
                }
                <div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username or Email address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            value={usernameOrEmail} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3" onClick={handleLogin}>Sign in</button>
                    <p className="mb-2">Don't have an account?
                        <Link to={"/register"}>Create a new account</Link>
                    </p>
                </div>
            </div>
        </div>

    );
}