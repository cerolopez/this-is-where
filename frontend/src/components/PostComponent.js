import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PostComponent.css";

function PostComponent({ post, likeCount, fullDisplay, reloadData }) {
    let dateFormat;
    const timestamp = post.date;
    dateFormat = new Date(timestamp);
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [isFavoritedByUser, setIsFavoritedByUser] = useState(false);

    useEffect(() => {
        async function reloadComponent() {
            let isLiked;
            let faveInfo;

            try {
                const res = await fetch(`/checkIfLiked?id=${post._id}`);
                isLiked = await res.json();
            } catch (e) {
                console.log("error downloading data: ", e);
                return false;
            }

            setIsLikedByUser(isLiked);

            try {
                const res = await fetch(`/checkIfFavorited?id=${post._id}`);
                faveInfo = await res.json();
            } catch (e) {
                console.log("error downloading data: ", e);
                return false;
            }

            setIsFavoritedByUser(faveInfo.isFavorited);
        }
        reloadComponent();
    }, [post._id]);

    async function sendFavoriteToDB() {
        if (!isFavoritedByUser) {
            const favRes = await fetch(`/favoritePost?id=${post._id}`);
            const favSuccess = await favRes.json();
            console.log("post favorited: ", favSuccess);
        } else {
            const unfavRes = await fetch(`/unfavoritePost?id=${post._id}`);
            const unfavSuccess = await unfavRes.json();
            console.log("post unfavorited: ", unfavSuccess);
        }

        reloadData();
    }

    async function sendLikeToDB() {
        if (!isLikedByUser) {
            const likeRes = await fetch(`/likePost?id=${post._id}`);
            const likeSuccess = await likeRes.json();
            console.log("post liked: ", likeSuccess);
        } else {
            const unlikeRes = await fetch(`/unlikePost?id=${post._id}`);
            const unlikeSuccess = await unlikeRes.json();
            console.log("post unliked: ", unlikeSuccess);
        }

        reloadData();
    }

    return (
        <div className="container" style={{ display: `${fullDisplay}` }}>
            <div className="row d-flex justify-content-center" id="post">
                <div className="col-md-3"></div>
                <div className="col-md-6">
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
                                        id="favorite-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
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
                                </Link>
                                &nbsp;&nbsp;
                                <Link
                                    id="post-title"
                                    to={{
                                        pathname: "/view-post",
                                        search: `?id=${post._id}`,
                                    }}
                                >
                                    {post.location}
                                </Link>
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
                                    <h4 id="post-subtitle">
                                        Posted on {dateFormat.toDateString()} by{" "}
                                        <strong>{post.username}</strong>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row d-flex justify-content-center" id="like">
                <div className="col-md-3"></div>
                <div className="col-md-6">

                    <Link
                        onClick={() => {
                            setIsLikedByUser(
                                !isLikedByUser
                                );
                                sendLikeToDB();
                                }}
                    >

                        <svg
                            id="heart-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill={
                                isLikedByUser
                                    ? "#BD2020"
                                    : "black"
                                }
                            className="bi bi-heart"
                            viewBox="0 0 16 16"
                        >
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                    </Link>
                        &nbsp;
                        <span style={{ verticalAlign: "middle" }}>{likeCount}</span>

                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

PostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    likeCount: PropTypes.number.isRequired,
    fullDisplay: PropTypes.string.isRequired,
    reloadData: PropTypes.func.isRequired,
};

export default PostComponent;
