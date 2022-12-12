import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PageTemplate from "./pages/PageTemplate.js";
import UserPosts from "./components/UserPosts.js";
import FavoritePosts from "./components/FavoritePosts.js";
import LikedPosts from "./components/LikedPosts.js";

function UserProfile() {
    const [username, setUsername] = useState("");
    const [userBio, setUserBio] = useState("");
    const [userLocation, setUserLocation] = useState("");
    const [loadDisplay, setLoadDisplay] = useState("block");
    const [profileDisplay, setProfileDisplay] = useState("none");

    useEffect(() => {
        async function loadUsername() {
            let data;
    
            try {
                const res = await fetch("/getUsername");
                data = await res.json();
            } catch (e) {
                console.log("error getting username: ", e);
                return false;
            }
    
            setUsername("@" + data.username);
        }
        loadUsername();

        async function loadUserInfo() {
            let data;

            try {
                const res = await fetch("/getUserInfo");
                data = await res.json();
            } catch (e) {
                console.log("error getting user info: ", e);
                return false;
            }

            setUserBio(data.userBio);
            setUserLocation(data.userLocation);
            setLoadDisplay("none");
            setProfileDisplay("block");
        }

        loadUserInfo();


    }, []);

    return (
        <>
            <div>
            <div className="container">
                <div className="row d-flex header-row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h1>Your Profile</h1>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            <div className="container" style={{ display: `${loadDisplay}` }}>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <p>Loading...</p>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
            {/* start profile info */}
            <div className="container" style={{ display: `${profileDisplay}` }}>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h2>{username}</h2>
                    </div>
                    <div className="col-md-2"></div>
                </div>

                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        {/* <p>{(userBio === "") ? <i>{noBioMsg}</i> : {userBio}}<br />{userLocation}</p> */}
                        <p>{(userBio === "") ? <i>No bio to display.</i> : userBio}<br />{(userLocation === "") ? <i>No location to display.</i> : userLocation}</p>
                        <Link
                            to="/settings"
                            className="btn btn-dark signUpButton"
                            role="button"
                        >
                            Edit Profile
                        </Link>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
                <br />

                <nav>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button 
                                className="nav-link active" 
                                id="nav-posts-tab" 
                                data-bs-toggle="tab" 
                                data-bs-target="#nav-posts" 
                                type="button" 
                                role="tab" 
                                aria-controls="nav-posts" 
                                aria-selected="true">Your Posts
                            </button>

                            <button 
                                className="nav-link" 
                                id="nav-likes-tab" 
                                data-bs-toggle="tab" 
                                data-bs-target="#nav-likes" 
                                type="button" 
                                role="tab" 
                                aria-controls="nav-likes" 
                                aria-selected="true">Liked Posts
                            </button>

                            <button 
                                className="nav-link" 
                                id="nav-favorites-tab" 
                                data-bs-toggle="tab" 
                                data-bs-target="#nav-favorites" 
                                type="button" 
                                role="tab" 
                                aria-controls="nav-favorites" 
                                aria-selected="true">Favorite Posts
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                    </div>
                        <div className="tab-content" id="nav-tabContent">
                            <div 
                                className="tab-pane fade show active" 
                                id="nav-posts" 
                                role="tabpanel" 
                                aria-labelledby="nav-posts-tab" 
                                tabIndex="0">
                                    <UserPosts />
                            </div>
                            <div 
                                className="tab-pane fade" 
                                id="nav-likes" 
                                role="tabpanel" 
                                aria-labelledby="nav-likes-tab" 
                                tabIndex="0">
                                    <LikedPosts />
                            </div>
                            <div 
                                className="tab-pane fade" 
                                id="nav-favorites" 
                                role="tabpanel" 
                                aria-labelledby="nav-favorites-tab" 
                                tabIndex="0">
                                    <FavoritePosts />
                            </div>
                </div>
            </nav>

            </div>
            <PageTemplate></PageTemplate>
        </div>
        </>
    );
}

// UserProfile.propTypes = {

// };

export default UserProfile;
