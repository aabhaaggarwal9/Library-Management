import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../../../Service/AuthService";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

export const Heros = () => {
    const {isLoggedIn} = useAuth();
    
    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <img src={require("./../../../Images/PublicImages/image-4.jpg")} className="img-fluid" />
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>What have you been reading?</h1>
                            <p className='lead'>
                                The library team would love to know what you have been reading.
                                Whether it is to learn a new skill or grow within one,
                                we will be able to provide the top content for you!
                            </p>
                            {
                                isLoggedIn ? 
                                <Link className='btn btn-primary btn-lg text-white' to={"/search"}>Explore top books</Link>
                                :
                                <Link className='btn btn-primary btn-lg text-white' to={"/register"}>Sign up</Link>

                            }
                            
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate book selection possible
                                for our Book Worm students! We are diligent about our book selection
                                and our books are always going to be our
                                top priority.
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <img src={require("./../../../Images/PublicImages/image-1.jpg")} className="img-fluid" />
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div>
                            <img src={require("./../../../Images/PublicImages/image-4.jpg")} className="img-fluid" />
                        </div>
                        <div className='mt-2'>
                            <h1>What have you been reading?</h1>
                            <p className='lead'>
                                The library team would love to know what you have been reading.
                                Whether it is to learn a new skill or grow within one,
                                we will be able to provide the top content for you!
                            </p>
                            {
                                isLoggedIn ? 
                                <Link className='btn btn-primary btn-lg text-white' to={"/search"}>Explore top books</Link>
                                :
                                <Link className='btn btn-primary btn-lg text-white' to={"/register"}>Sign up</Link>

                            }
                        </div>
                    </div>
                    <div className='m-2'>
                        <div>
                            <img src={require("./../../../Images/PublicImages/image-1.jpg")} className="img-fluid" />
                        </div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate book selection possible
                                for our Luv 2 Read students! We are diligent about our book selection
                                and our books are always going to be our
                                top priority.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}