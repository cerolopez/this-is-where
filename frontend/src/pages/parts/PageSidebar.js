import React from "react";
import { Link } from "react-router-dom";
import "./PageSidebar.css";

function PageSidebar() {

    return (
        <nav className="navbar bg-transparent fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header justify-content-end">
                        <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard"><h5>Home</h5></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/settings"><h5>Settings</h5></Link>
                            </li>
                        </ul>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 text-center">
                            <form action="/userLogout" method="post">
                                <input className="btn btn-dark" type="submit" value="Log Out" readOnly></input>
                            </form>
                        </div>
                    </div>
                    <br />
                </div>

            </div>
        </nav>
    )
}

export default PageSidebar;