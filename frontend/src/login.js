import React from "react";
import PageFooter from "./pages/parts/PageFooter.js";
import LoginField from "./components/LoginField.js";

const LogIn = () => {
    return (
        <div>
            <div className="container text-center">
                <div className="row d-flex justify-content-center header-row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1>Log In</h1>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form action="/userLogin" method="post">
                        <LoginField _for="Username" _label="Username" _type="text" _name="username"> </LoginField>

                        <LoginField _for="Password" _label="Password" _type="password" _name="password"> </LoginField>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            <PageFooter></PageFooter>
        </div>
    );
};

export default LogIn;
