import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReportPost from "./ReportPost.js";
import Alert from "./Alert.js";
import DeletePost from "./DeletePost.js";
import EditPost from "./EditPost.js";
import { Link } from "react-router-dom";
import "./FullPostComponent.css";

function FullPostComponent({ 
        post, 
        modDisplay, 
        fullDisplay, 
        reportDisplay, 
        editDisplay,
        setEditDisplay,
        reloadData, 
        likes, 
        favorites }) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const isLiked = likes.includes(id);
    console.log("isLiked: ", isLiked);
    const [isLikedByUser, setIsLikedByUser] = useState(likes.includes(id));
    console.log("isLikedByUser state: ", isLikedByUser);


    const [isFavoritedByUser, setIsFavoritedByUser] = useState(favorites.includes(id));
    const [alertVisibility, setAlertVisibility] = useState("none");
    const [deleteDisplay, setDeleteDisplay] = useState("none");
    const [deleteMsg, setDeleteMsg] = useState("Deleting post...");

    const [currentLikes, setCurrentLikes] = useState(post.likeCount);

    const fullDate = new Date(post.date);
    const dateString = fullDate.toDateString();
    const subtitle = `Posted on ${dateString} by `;

    async function sendFavoriteToDB() {
        if (!isFavoritedByUser) {
            console.log("I'm favoriting a post");
            const favRes = await fetch(`/favoritePost?id=${id}`);
            const favSuccess = await favRes.json();
            console.log("post favorited: ", favSuccess);
        } else {
            console.log("I'm unliking a post");
            const unfavRes = await fetch(`/unfavoritePost?id=${id}`);
            const unfavSuccess = await unfavRes.json();
            console.log("post unfavorited: ", unfavSuccess);
        }
    }

    async function sendLikeToDB() {
        if (!isLikedByUser) {
            console.log("I'm liking a post");
            const likeRes = await fetch(`/likePost?id=${id}`);
            const likeSuccess = await likeRes.json();
            console.log("post liked: ", likeSuccess);
        } else {
            const unlikeRes = await fetch(`/unlikePost?id=${id}`);
            const unlikeSuccess = await unlikeRes.json();
            console.log("post unliked: ", unlikeSuccess);
        }
    }

    return (
        <div className="container" style={{ display: `${fullDisplay}` }}>
            <div className="row d-flex justify-content-center post">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <Alert alert_type="success" display={alertVisibility}>
                        Your report has been sent.{" "}
                    </Alert>
                    <Alert alert_type="success" display={deleteDisplay}>
                        {deleteMsg}{" "}
                    </Alert>
                    <Alert alert_type="success" display={editDisplay}>
                        Edits received. Reloading content...{" "}
                    </Alert>
                    <div className="card postID">
                        <div className="card-body">
                            <h2>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        tabindex={0}
                                        onClick={() => {
                                            setIsFavoritedByUser(
                                                !isFavoritedByUser
                                            );
                                            sendFavoriteToDB();
                                        }}

                                        aria-label="favorite post"
                                        fill={
                                            isFavoritedByUser
                                                ? "#F6BE00"
                                                : "black"
                                        }
                                        className="bi bi-star"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                    </svg>

                                &nbsp;&nbsp;
                                {post.location}
                            </h2>
                            <div className="row justify-content-start">
                                <div className="col-md-12">
                                    <span className="label info">
                                        {post.city}
                                    </span>
                                    &nbsp;&nbsp;&nbsp;
                                    <span className="label info">
                                        {post.type}
                                    </span>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <p>{post.body}</p>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <h3
                                        className="post-subtitle"
                                        style={{ display: `${fullDisplay}` }}
                                    >
                                        {subtitle}
                                        <strong>{post.username}</strong>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2"></div>
            </div>

            <div className="row d-flex justify-content-center like">
                <div className="col-md-2"></div>

                {/* like button */}
                    <div className="col-md-5">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                tabindex={0}
                                aria-label="Like post"
                                fill={
                                    isLikedByUser
                                        ? "#BD2020"
                                        : "black"
                                    }
                                className="bi bi-heart heart-icon"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                    if (isLikedByUser) {
                                        setCurrentLikes(c => c - 1);
                                    } else {
                                        setCurrentLikes(c => c + 1);
                                    }
                                    setIsLikedByUser(!isLikedByUser);
                                    sendLikeToDB();
                    }}
                            >
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        &nbsp;
                        <span style={{ verticalAlign: "middle" }}>{currentLikes}</span>
                    </div>

                    {/* report post button */}
                    <div className="col-md-3" style={{ display: `${reportDisplay}` }}>
                        <div style={{ float: "right" }}>
                            <ReportPost
                            postId={id}
                            setAlertVisibility={setAlertVisibility}
                            >
                                {" "}
                            </ReportPost>
                        </div>
                    </div>

                    {/* edit and delete buttons */}
                    <div className="col-md-3" style={{ display: `${modDisplay}` }}>
                    <span style={{ float: "right" }}>
                        <div>
                        <EditPost
                            post={post}
                            reloadData={reloadData}
                            setEditDisplay={setEditDisplay}
                        ></EditPost>
                        &nbsp;&nbsp;
                        <DeletePost 
                            postID={id}
                            setDeleteDisplay={setDeleteDisplay}
                            setDeleteMsg={setDeleteMsg}
                        ></DeletePost>
                        </div>
                    </span>
                    </div>
                    <div className="col-md-2"></div>
            </div>
        </div>
    );
}

FullPostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    modDisplay: PropTypes.string.isRequired,
    fullDisplay: PropTypes.string.isRequired,
    reloadData: PropTypes.func.isRequired,
};

export default FullPostComponent;
