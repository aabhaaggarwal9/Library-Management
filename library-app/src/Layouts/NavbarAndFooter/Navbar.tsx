import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getRole, logoutAPI } from "../../Service/AuthService";
import { useAuth } from "../Utils/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const role = getRole();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutAPI();
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">BookWorm</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/search">Search Book</NavLink>
            </li>
            {
              isLoggedIn &&
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/shelf">Shelf</NavLink>
              </li>
            }
            {
              isLoggedIn && role == 'ROLE_ADMIN' &&
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/admin">Admin</NavLink>
              </li>
            }
          </ul>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item m-1'>
              {isLoggedIn ?
                <button type='button' className='btn btn-outline-light' onClick={handleLogout}>
                  Logout
                </button>
                :
                <NavLink type='button' className='btn btn-outline-light' to='/login'>
                  Sign in
                </NavLink>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}