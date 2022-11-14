import React from 'react';
import PageTemplate from "./pages/PageTemplate.js"

const Settings = () => {
    return (
        <div>
        <div className="container">
            <div className="row d-flex header-row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <h1>Settings</h1>
            </div>
            <div className="col-md-3"></div>
            </div>
            <div className="row d-flex">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <p>Add settings form here</p>
                </div>
                <div className="col-md-3"></div>
            </div>
            </div>
            <PageTemplate></PageTemplate>
        </div>
    )
}

export default Settings;