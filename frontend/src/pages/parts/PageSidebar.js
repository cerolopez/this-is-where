import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./PageSidebar.css";

function PageSidebar() {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        async function reloadData() {
            let data;

            // fetch user's posts
            const res = await fetch("/getUserId");
            data = await res.json();

            setUserId(data.user_id);
        }
        reloadData();
    }, []);

    return (
        <nav className="navbar bg-transparent fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-label="toggle navbar" aria-controls="offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header justify-content-end">
                        <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav flex-grow-1 pe-3">
                            <li className="nav-item">
                                {/*<Link className="nav-link" to="/dashboard"><h2>Home</h2></Link>*/}
                                <a className="nav-link" href="/dashboard"><h2>Home</h2></a>
                            </li>
                            <li className="nav-item">

                                <a className="nav-link" href="/profile"><h2>Profile</h2></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/settings"><h2>Settings</h2></a>
                            </li>
                        </ul>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 text-center">
                            <form action="/userLogout" method="post">
                                <input className="btn btn-dark logOutButton" type="submit" value="Log Out" readOnly></input>
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