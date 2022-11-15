import React from "react";
import PageFooter from "./pages/parts/PageFooter.js";

const LoginField = ({ _for, _label, _type }) => {
    return (
    <div className="mb-3">
        <label for={"input" + _for} className="form-label">
            {_label}
        </label>
        <input
            type={_type}
            className="form-control"
            id={"input" + _label}
            required
        />
    </div>
    );
};

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
                        <form>
                        <LoginField _for="Username" _label="Username" _type="text"> </LoginField>

                        <LoginField _for="Password" _label="Password" _type="password"> </LoginField>
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
