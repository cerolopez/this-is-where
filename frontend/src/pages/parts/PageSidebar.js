import React from "react";

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
                                <a className="nav-link" href="/dashboard"><h5>Home</h5></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile"><h5>Profile</h5></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/settings"><h5>Settings</h5></a>
                            </li>
                        </ul>
                    </div>
                    <input className="btn btn-light" type="logout" value="Log Out" readOnly></input>
                </div>

            </div>
        </nav>
    )
}

export default PageSidebar;