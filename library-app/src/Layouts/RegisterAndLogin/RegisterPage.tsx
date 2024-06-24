import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEffectiveConstraintOfTypeParameter } from "typescript";
import { register } from "../../Service/AuthService";

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [httpError, setHttpError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if(username === '' || password === '' || email === '' || name === ''){
            setHttpError('Please fill all the required fields');
        }
        else{
            const registerPayload = {
                username : username,
                password : password,
                email : email,
                name: name
            }
            register(registerPayload).then((response: any) => {
                navigate("/login");
                setHttpError('');
            }).catch((error: any) => {
                console.log(error);
                setHttpError(error.response.data);
            })
        }
    }

    return(
        <div className="card container shadow-lg mt-5 mb-5" style={{ width: "25rem" }}>
            <div className="card-header fs-5 text-center mb-2">
                BookWorm
            </div>
            <div className="card-body">
                <h1 className="card-title text-center mb-5">Sign Up</h1>
                {
                    httpError !== "" &&
                    <div className="alert alert-danger" role="alert">
                        {httpError}
                    </div>
                }
                <div>
                <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" required
                            onChange={(e) => setName(e.target.value)}
                            value={name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" required
                            onChange={(e) => setUsername(e.target.value)}
                            value={username} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3" onClick={handleRegister}>Sign up</button>
                    <p className="mb-2">Already have an account?
                        <Link to={"/login"}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>

    );
}