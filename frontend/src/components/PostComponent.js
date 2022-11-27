import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useNavigate, Link} from "react-router-dom";

function PostComponent({ post, likeCount, fullDisplay, reloadData }) {
    const navigate = useNavigate();
    const [isLikedByUser, setIsLikedByUser] = useState(false);

    useEffect(
        () => {
            async function reloadComponent() {
                let isLiked;
        
                try {
                    const res = await fetch(`/checkIfLiked?id=${post._id}`);
                    isLiked = await res.json();
                } catch (e) {
                    console("error downloading data: ", e);
                    return false;
                }

                setIsLikedByUser(isLiked);

            }
            reloadComponent();
    }, []
    );

    // async function getFavesByUser(postID) {
    //     const res = await fetch(`/checkIfFavorited?id=${postID}`);
    //     const isFavorited = await res.json();
    //     return isFavorited;
    // }
        
    function handleLinkClick(evt) {
        console.log("I'm in handleLinkClick");
        evt.preventDefault();
        navigate(`/view-post?id=${post._id}`, {replace: false});
    };

    async function sendLikeToDB() {
        if (!isLikedByUser) {
            console.log("I'm liking a post");
            const likeRes = await fetch(`/likePost?id=${post._id}`);
            const likeSuccess = await likeRes.json();
            console.log("post liked: ", likeSuccess);
        } else {
            console.log("I'm unliking a post");
            const unlikeRes = await fetch(`/unlikePost?id=${post._id}`);
            const unlikeSuccess = await unlikeRes.json();    
            console.log("post unliked: ", unlikeSuccess);
        }

        reloadData();
    }

    return (
        <div className="container" style={{display: `${fullDisplay}`}}>
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
                        sendLikeToDB();
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
    post: PropTypes.object.isRequired
}

export default PostComponent;