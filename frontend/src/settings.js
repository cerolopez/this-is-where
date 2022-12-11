import React, { useState, useEffect } from "react";
// import PageTemplate from "./pages/PageTemplate.js";
import PageSidebar from "./pages/parts/PageSidebar.js";
import PageFooter from "./pages/parts/PageFooter.js";
import Alert from "./components/Alert.js";
import { useNavigate } from "react-router-dom";
import UserSetting from "./components/UserSetting";

import "./styles/Login.css";

//TODO - separate account settings and profile settings into two different components?
//TODO - make sure user can't edit username to one that already exists

import "./styles/Settings.css";


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


    const [profileAlertMsg, setProfileAlertMsg] = useState("");
    const [profileAlertVisibility, setProfileAlertVisibility] = useState("none");
    const [profileAlertType, setProfileAlertType] = useState("");



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
            // setTimeout(() => {
            //     navigate("/settings", { replace: true });
            // }, 1500);
        }
    }

    return (
        <>
        {/*<PageSidebar></PageSidebar>*/}
        <div className="row header-row loginHeader"><PageSidebar></PageSidebar></div>

        <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-account-tab" data-bs-toggle="tab" data-bs-target="#nav-account" type="button" role="tab" aria-controls="nav-account" aria-selected="true">My Account</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">My Profile</button>

  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-account" role="tabpanel" aria-labelledby="nav-account-tab" tabindex="0">
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
                    {/*<div className="col-md-3"></div>*/}
                    <div className="col-md-6">
                        <Alert alert_type={alertType} display={alertVisibility}>
                            {alertMsg}
                        </Alert>
                        <h2>Edit Account</h2>
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
                        <br /> <br /> <br /> <hr />
                        <div className="card userSetting">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Do you want to delete your account?
                                </h2>
                                <p className="card-text">
                                    Please click the button below only if you are absolutely sure -
                                    this will permanently delete your account
                                    and all of your posts!
                                </p>
                                <form action="/deleteAccount" method="post">
                                    <button
                                        className="btn btn-outline-dark"
                                        id="deleteButton"
                                    >
                                        Delete Account
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/*<div className="col-md-3"></div>*/}
                </div>
            </div>
            {/*<PageTemplate></PageTemplate>*/}
        </div>








  </div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                  <div className="container">
                <div className="row d-flex header-row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1>Account Settings</h1>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                 <div className="row d-flex">
                    {/*<div className="col-md-3"></div>*/}
                    <div className="col-md-6">
                        <Alert alert_type={profileAlertType} display={profileAlertVisibility}>
                            {profileAlertMsg}
                        </Alert>
                        <h2>Edit Profile</h2>
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
                                                        <button
                                type="submit"
                                id="submitUsernameButton"
                                className="btn btn-dark submitButton"
                            >
                                Submit
                            </button>
                            </form>
                        </div>
                        </div>


                </div>
  </div>

</div>
<PageFooter></PageFooter>

</>






       
    );
};

export default Settings;
