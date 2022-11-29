import React, { useState, useEffect } from "react";
import PageTemplate from "./pages/PageTemplate.js";
import Alert from "./components/Alert.js";
import { useNavigate } from "react-router-dom";
import UserSetting from "./components/UserSetting";
import "./Settings.css";

const Settings = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        async function getAuth() {
            const res = await fetch("/getAuthentication");
            const resJson = await res.json();
            if (!resJson.authenticated) {
                navigate("/login", { replace: true });
            } else {
                setAuthenticated(true);
            }
        }
        getAuth();
    });

    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [alertVisibility, setAlertVisibility] = useState("none");
    const [alertType, setAlertType] = useState("");

    useEffect(() => {
        async function setCurrentUserInfo() {
            if (!authenticated) {
                return;
            }
            const usernameRes = await fetch("/getUsername");
            const usernameResJson = await usernameRes.json();
            const emailRes = await fetch("/getEmail");
            const emailResJson = await emailRes.json();
            const currentUsername = usernameResJson.username;
            const currentEmail = emailResJson.email;
            setNewUsername(currentUsername);
            setNewEmail(currentEmail);
        }
        setCurrentUserInfo();
    }, [authenticated]);

    async function onSubmit(evt) {
        evt.preventDefault();
        const usernameRes = await fetch("/updateUsername", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername }),
        });
        const usernameResJson = await usernameRes.json();
        const emailRes = await fetch("/updateUserEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: newEmail }),
        });
        const emailResJson = await emailRes.json();
        if (!usernameResJson.success || !emailResJson.success) {
            setAlertMsg(
                "There was an issue and your account information could not be updated at this time."
            );
            setAlertType("danger");
            setAlertVisibility("block");
        } else {
            setAlertMsg("Successfully changed your account information.");
            setAlertType("success");
            setAlertVisibility("block");
        }
    }

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
                        <Alert alert_type={alertType} display={alertVisibility}>
                            {alertMsg}
                        </Alert>
                        <form
                            id="submitUsernameForm"
                            name="submitUsernameForm"
                            onSubmit={onSubmit}
                        >
                            <UserSetting
                                _type="text"
                                _setting="username"
                                _value={newUsername}
                                _setState={(evt) =>
                                    setNewUsername(evt.target.value)
                                }
                            ></UserSetting>
                            <UserSetting
                                _type="email"
                                _setting="email address"
                                _value={newEmail}
                                _setState={(evt) =>
                                    setNewEmail(evt.target.value)
                                }
                            ></UserSetting>
                            <button
                                type="submit"
                                id="submitUsernameButton"
                                className="btn btn-dark submitButton"
                            >
                                Submit
                            </button>
                        </form>
                        <br />
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
                                <form action="/deleteAccount" method="post">
                                    <button
                                        className="btn btn-danger"
                                        id="deleteButton"
                                    >
                                        Delete Account
                                    </button>
                                </form>
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
