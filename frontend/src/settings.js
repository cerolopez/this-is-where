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
//TODO - have Alert's close button navigate back to settings, so that page will reload and another Alert will be possible

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
    }, [navigate]);

    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newBio, setNewBio] = useState("");
    const [profileHidden, setProfileHidden] = useState(false); //Change false to user's actual profile visibility once loaded
    const [loadedUserInfo, setLoadedUserInfo] = useState(false);

    //alert for account settings
    const [alertMsg, setAlertMsg] = useState("");
    const [alertVisibility, setAlertVisibility] = useState("none");
    const [alertType, setAlertType] = useState("");


    //alert for profile settings
    const [profileAlertMsg, setProfileAlertMsg] = useState("");
    const [profileAlertVisibility, setProfileAlertVisibility] = useState("none");
    const [profileAlertType, setProfileAlertType] = useState("");



    useEffect(() => {
        async function setCurrentUserInfo() {
            if (!authenticated) {
                return;
            }
            // const usernameRes = await fetch("/getUsername");
            // const usernameResJson = await usernameRes.json();
            // const emailRes = await fetch("/getEmail");
            // const emailResJson = await emailRes.json();
            // const currentUsername = usernameResJson.username;
            // const currentEmail = emailResJson.email;
            const userInfoRes = await fetch("/getUserProfileInfo");
            const userInfoJson = await userInfoRes.json();
            const userInfo = userInfoJson.userInfo.at(0);
            console.log("userInfo: ", userInfo);
            // setNewUsername(currentUsername);
            // setNewEmail(currentEmail);
            setNewUsername(userInfo.username);
            setNewEmail(userInfo.email);
            setNewFirstName(userInfo.first_name);
            setNewLastName(userInfo.last_name);
            setNewLocation(userInfo.location);
            setProfileHidden(userInfo.profile_is_hidden);
            setNewBio(userInfo.bio);
            setLoadedUserInfo(true);
        }
        setCurrentUserInfo();
    }, [authenticated]);




    async function onEditAccountSubmit(evt) {
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




    async function onEditProfileSubmit(evt) {
        evt.preventDefault();
        const updateRes = await fetch("/updateProfileInfo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ first_name: newFirstName, last_name: newLastName, username: newUsername, location: newLocation, bio: newBio }),
        });
        const updateJson = await updateRes.json();

        if (!updateJson.success) {
            setProfileAlertMsg(
                "There was an issue and your profile information could not be updated at this time."
            );
            setProfileAlertType("danger");
            setProfileAlertVisibility("block");
        } else {
            setProfileAlertMsg("Successfully changed your profile information.");
            setProfileAlertType("success");
            setProfileAlertVisibility("block");
            // setTimeout(() => {
            //     navigate("/settings", { replace: true });
            // }, 1500);
        }
    }

    async function updateProfileVisibility() {
        const res = await fetch("/changeProfilePrivacy");
        const resJson = await res.json();
        if (!resJson.success) {
            setProfileAlertMsg("There was an issue and your profile privacy could not be updated at this time.");
        
            setProfileAlertType("danger");
            setProfileAlertVisibility("block");
        } else {
            setProfileAlertMsg("Successfully changed your profile visibility.");
            setProfileAlertType("success");
            setProfileAlertVisibility("block");
        }

    }





    if (authenticated && loadedUserInfo) { //if it ends up being too slow, don't wait for user info to load before rendering


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
                            id="submitEditAccountForm"
                            name="submitEditAccountForm"
                            onSubmit={onEditAccountSubmit}
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
                                id="submitEditAccountButton"
                                className="btn btn-dark action-btn"
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
                                        className="btn btn-outline-dark action-btn deleteButton"
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
                            id="submitEditProfileForm"
                            name="submitEditProfileForm"
                            onSubmit={onEditProfileSubmit}
                        >
                            <UserSetting
                                _type="text"
                                _setting="first name"
                                _value={newFirstName}
                                _setState={(evt) =>
                                    setNewFirstName(evt.target.value)
                                }
                            ></UserSetting>
                            <UserSetting
                                _type="text"
                                _setting="last name"
                                _value={newLastName}
                                _setState={(evt) =>
                                    setNewLastName(evt.target.value)
                                }
                            ></UserSetting>
                            <UserSetting
                                _type="text"
                                _setting="location"
                                _value={newLocation}
                                _setState={(evt) =>
                                    setNewLocation(evt.target.value)
                                }
                            ></UserSetting>
                            <br />
                            <span> Change profile visibility: </span>
                            <br />
                            <div className="form-check form-switch">

                              <input className="form-check-input" checked={profileHidden ? true : false} type="checkbox" role="switch" id="toggleProfileVisibility" onChange={() => {
                                setProfileHidden(!profileHidden);
                                updateProfileVisibility();
                            }}/>
                              <label className="form-check-label" htmlFor="toggleProfileVisibility">{profileHidden ? "Private" : "Public"}</label>
                            </div>
                            <label htmlFor="bio-text" className="col-form-label">Edit your biography: </label>
                            <textarea id="bio-text" className="form-control" value={newBio} onChange={(evt) => setNewBio(evt.target.value)}></textarea>
                            <br />   
                            <button
                                type="submit"
                                id="submitEditProfileButton"
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
    }
};

export default Settings;
