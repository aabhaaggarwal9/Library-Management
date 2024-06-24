import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../../../Service/AuthService";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

export const LibraryServices = () => {
    const {isLoggedIn} = useAuth();

    return(
        <div className='container my-5'>
            <div className='row p-4 align-items-center border shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>
                        Can't find what you are looking for?
                    </h1>
                    <p className='lead'>
                        If you cannot find what you are looking for,
                        send our library admin's a personal message!
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                        {
                            isLoggedIn ?
                            <Link className='btn btn-primary btn-lg text-white' to={"#"}>
                            Library Services
                        </Link>
                        :
                        <Link className='btn btn-primary btn-lg text-white' to={"/register"}>
                            Sign up
                        </Link>
                        }
                        
                    </div>
                </div>
                <div className='col-lg-4 offset-lg-1 shadow-lg p-0'>
                    <img src={require("./../../../Images/PublicImages/image-3.jpg")} className="img-fluid"/>
                </div>
            </div>
        </div>

    );
}