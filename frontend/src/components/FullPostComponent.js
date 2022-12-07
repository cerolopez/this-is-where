import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReportPost from "./ReportPost.js";
import Alert from "./Alert.js";
import DeletePost from "./DeletePost.js";
import EditPost from "./EditPost.js";
import { Link } from "react-router-dom";

function FullPostComponent({ post, modDisplay, fullDisplay, reloadData }) {
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [isFavoritedByUser, setIsFavoritedByUser] = useState(false);
    const [alertVisibility, setAlertVisibility] = useState("none");

    const fullDate = new Date(post.date);
    const dateString = fullDate.toDateString();
    const subtitle = `Posted on ${dateString} by `;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    useEffect(() => {
        async function reloadComponent() {
            let isLiked;
            let faveInfo;

            try {
                const res = await fetch(`/checkIfLiked?id=${id}`);
                isLiked = await res.json();
            } catch (e) {
                console.log("error downloading data: ", e);
                return false;
            }

            setIsLikedByUser(isLiked);

            try {
                const res = await fetch(`/checkIfFavorited?id=${id}`);
                faveInfo = await res.json();
                console.log("isFavorited: ", faveInfo.isFavorited);
            } catch (e) {
                console("error downloading data: ", e);
                return false;
            }

            setIsFavoritedByUser(faveInfo.isFavorited);
        }

        reloadComponent();
    }, [id]);

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

        reloadData();
    }

    async function sendLikeToDB() {
        if (!isLikedByUser) {
            console.log("I'm liking a post");
            const likeRes = await fetch(`/likePost?id=${id}`);
            const likeSuccess = await likeRes.json();
            console.log("post liked: ", likeSuccess);
        } else {
            console.log("I'm unliking a post");
            const unlikeRes = await fetch(`/unlikePost?id=${id}`);
            const unlikeSuccess = await unlikeRes.json();
            console.log("post unliked: ", unlikeSuccess);
        }

        reloadData();
    }

    return (
        <div className="container" style={{ display: `${fullDisplay}` }}>
            <div className="row d-flex justify-content-center" id="post">
                <Alert alert_type="success" display={alertVisibility}>
                    Your report has been sent.{" "}
                </Alert>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card" id="postID">
                        <div className="card-body">
                            <h2>
                                <Link
                                    onClick={() => {
                                        setIsFavoritedByUser(
                                            !isFavoritedByUser
                                        );
                                        sendFavoriteToDB();
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        fill={
                                            isFavoritedByUser
                                                ? "yellow"
                                                : "black"
                                        }
                                        className="bi bi-star"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                    </svg>
                                </Link>
                                &nbsp;&nbsp;
                                {post.location}
                            </h2>
                            {/* <h4 className="card-title">{post.location}</h4> */}
                            <div className="row justify-content-start">
                                <div className="col-md-2">
                                    <span className="badge bg-secondary">
                                        {post.city}
                                    </span>
                                </div>
                                <div className="col-md-2">
                                    <span className="badge bg-secondary">
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
                                    <h5
                                        id="post-subtitle"
                                        style={{ display: `${fullDisplay}` }}
                                    >
                                        {subtitle}
                                        <strong>{post.username}</strong>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div style={{ display: `${modDisplay}` }}>
                        <EditPost
                            post={post}
                            reloadData={reloadData}
                        ></EditPost>
                    </div>
                    <br />
                    <div style={{ display: `${modDisplay}` }}>
                        <DeletePost postID={id}></DeletePost>
                    </div>
                </div>
                <div className="row d-flex justify-content-center" id="like">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLikedByUser(!isLikedByUser);
                                sendLikeToDB();
                            }}
                            className={
                                isLikedByUser
                                    ? "btn btn-outline-danger"
                                    : "btn btn-outline-secondary"
                            }
                        >
                            Like {post.likeCount}
                        </button>
                    </div>
                    <div className="col-md-4">
                        <ReportPost
                            postId={id}
                            setAlertVisibility={setAlertVisibility}
                        >
                            {" "}
                        </ReportPost>
                    </div>
                    <div className="col-md-2"></div>
                </div>
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
