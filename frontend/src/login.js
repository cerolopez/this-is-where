import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageFooter from "./pages/parts/PageFooter.js";
import LoginField from "./components/LoginField.js";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const LogIn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function getAuth() {
            const res = await fetch("/getAuthentication");
            const resJson = await res.json();
            if (resJson.authenticated) {
                console.log("user is authenticated.");
                navigate("/dashboard", { replace: true });
            } else {
                console.log("user is not authenticated.");
            }
        }
        getAuth();
    });
    return (
        <div>
            <div className="row header-row loginHeader"></div>
            <div className="container text-center">
                <div className="row d-flex justify-content-center header-row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h1>Log In</h1>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row d-flex">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <form action="/userLogin" method="post">
                                    <LoginField
                                        _for="Username"
                                        _label="Username"
                                        _type="text"
                                        _name="username"
                                    >
                                        {" "}
                                    </LoginField>

                                    <LoginField
                                        _for="Password"
                                        _label="Password"
                                        _type="password"
                                        _name="password"
                                    >
                                        {" "}
                                    </LoginField>
                                    <button
                                        type="submit"
                                        className="btn btn-dark action-btn"
                                    >
                                        Submit
                                    </button>
                                </form>
                                <br />
                                <p>
                                    Don't have an account?{" "}
                                    <Link to="/signup">Sign up.</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
            <PageFooter></PageFooter>
        </div>
    );
};

export default LogIn;
