import React from "react";
import PageTemplate from "./pages/PageTemplate.js";

const UserSetting = ({setting}) => {
    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text userSetting" id="addon-wrapping">
                Change {setting} 
            </span>
            <input
                type="text"
                className="form-control userSetting"
                placeholder={`New ${setting}`}
                aria-label={`New ${setting}`}
                aria-describedby="addon-wrapping"
            />
        </div>
    );
};

const Settings = () => {
    return (
        <div>
            <div className="container">
                <div className="row d-flex header-row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1>Account Settings</h1>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row d-flex">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form id="submitUsernameForm" name="submitUsernameForm">
                        <UserSetting setting="username"></UserSetting>
                        <UserSetting setting="email address"></UserSetting>
                            <button
                                type="submit"
                                id="submitUsernameButton"
                                className="btn btn-primary submitButton"
                            >
                                Submit
                            </button>
                        </form>
                        <br/>
                        <div className="card userSetting">
                            <div className="card-header">Remove account</div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    Do you want to delete your account?
                                </h5>
                                <p className="card-text">
                                    Please click submit only if you are sure -
                                    this will permanently delete your account
                                    and all of your posts!
                                </p>
                                <button
                                    className="btn btn-danger"
                                    id="deleteButton"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            <PageTemplate></PageTemplate>
        </div>
    );
};

export default Settings;
