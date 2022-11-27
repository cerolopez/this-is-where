import React, {useState} from "react";
import PropTypes from "prop-types";
import {useNavigate, Link} from "react-router-dom";

function PostComponent({ post, reloadData }) {
    const navigate = useNavigate();

    async function getLikesByUser(postID) {
        const res = await fetch(`/checkIfLiked?id=${postID}`);
        const isLiked = await res.json();
        return isLiked;
    }

    // async function getFavesByUser(postID) {
    //     const res = await fetch(`/checkIfFavorited?id=${postID}`);
    //     const isFavorited = await res.json();
    //     return isFavorited;
    // }

    const initIsLiked = getLikesByUser(post._id);
    const [isLikedByUser, setIsLikedByUser] = useState(initIsLiked);
    const [likeCount, setLikeCount] = useState(post.likeCount);

        
    function handleLinkClick(evt) {
        console.log("I'm in handleLinkClick");
        evt.preventDefault();
        navigate(`/view-post?id=${post._id}`, {replace: false});
    };

    async function likePost() {
        const likeRes = await fetch(`/likePost?id=${post._id}`);
        const likeSuccess = await likeRes.json();
        return likeSuccess;
    }

    async function unlikePost() {
        const unlikeRes = await fetch(`/unlikePost?id=${post._id}`);
        const unlikeSuccess = await unlikeRes.json();
        return unlikeSuccess;
    }

    async function sendLikeToDB(isLiked) {
        console.log("initIsLiked: ", initIsLiked);
        if (!isLiked) {
            setLikeCount(likeCount + 1);
            await likePost();
        } else {
            setLikeCount(likeCount - 1);
            await unlikePost();
        }

        reloadData();
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center" id="post">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="card" id="postID">
                        <div className="card-body">
                         <Link onClick={event => handleLinkClick(event)}><h4>{post.location}</h4></Link>
                         <div className="row justify-content-start">
                            <div className="col-md-3">
                                <span className="badge bg-secondary">{post.city}</span>
                            </div>
                            <div className="col-md-3">
                                <span className="badge bg-secondary">{post.type}</span>
                            </div>
                         </div>
                         <br />
                         <div className="row">
                            <div className="col-md-12">
                                <h5 id="post-subtitle">Posted on {post.timestamp} by <strong>{post.username}</strong></h5>
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
                <button
                    type="button"
                    onClick={() => {
                        setIsLikedByUser(!isLikedByUser);
                        sendLikeToDB(isLikedByUser);
                    }}
                    className={isLikedByUser ? "btn btn-outline-danger" : "btn btn-outline-secondary"}
                    >
                        Like {likeCount}
                    </button>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

PostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    reloadData: PropTypes.func.isRequired
}

export default PostComponent;