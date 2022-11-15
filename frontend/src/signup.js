import React from 'react';
import PageFooter from './pages/parts/PageFooter.js';

const SignUp = () => {
    return (
        <div>
        <div className="container text-center">
            <div className="row d-flex justify-content-center header-row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <h1>Sign Up</h1>
            </div>
            <div className="col-md-3"></div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <p>Placeholder for signup form</p>
                </div>
                <div className="col-md-3"></div>
            </div>
            </div>
            <PageFooter></PageFooter>
        </div>
    )
}

export default SignUp;