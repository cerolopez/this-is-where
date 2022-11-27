import React, { useState } from "react";
import PropTypes from "prop-types";
import getLikesByUser from ".//PostsFeed.js";
import ReportPost from "./ReportPost.js";
import Alert from "./Alert.js";
import DeletePost from "./DeletePost.js";
import EditPost from "./EditPost.js";

function FullPostComponent({ post, modDisplay, fullDisplay, reloadData }) {
    const [isLikedByUser, setIsLikedByUser] = useState(getLikesByUser(post._id));
    const [alertVisibility, setAlertVisibility] = useState("none");

    const fullDate = new Date(post.date);
    const dateString = fullDate.toDateString();
    const subtitle = `Posted on ${dateString} by `;

    return (
        <div className="container" style={{display: `${fullDisplay}`}}>
            <div className="row d-flex justify-content-center" id="post">
            <Alert alert_type="success" display={alertVisibility}>Your report has been sent. </Alert>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card" id="postID">
                        <div className="card-body">
                         <h4 className="card-title">{post.location}</h4>
                         <div className="row justify-content-start">
                            <div className="col-md-2">
                                <span className="badge bg-secondary">{post.city}</span>
                            </div>
                            <div className="col-md-2">
                                <span className="badge bg-secondary">{post.type}</span>
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
                                <h5 id="post-subtitle" style={{display: `${fullDisplay}`}}>{subtitle}<strong>{post.username}</strong></h5>
                            </div>
                         </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                <div style={{display: `${modDisplay}`}}>
                        <EditPost
                            post={post}
                            reloadData={reloadData}
                        ></EditPost>
                    </div>
                    <br />
                    <div style={{display: `${modDisplay}`}}>
                        <DeletePost
                            postID={post._id}
                        ></DeletePost>
                    </div>
                </div>
                <div className="row d-flex justify-content-center" id="like">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                <button
                    type="button"
                    onClick={() => {
                        setIsLikedByUser(!isLikedByUser);
                    }}
                    className={!isLikedByUser ? "btn btn-outline-danger" : "btn btn-outline-secondary"}
                    >
                        Like {post.likeCount}
                    </button>
                </div>
                <div className="col-md-4">
                <ReportPost 
                    postId={post._id} 
                    setAlertVisibility={setAlertVisibility}
                > </ReportPost>
                </div>
                <div className="col-md-2">
                </div>
            </div>
            </div>
        </div>
    )
}

FullPostComponent.propTypes = {
    post: PropTypes.object.isRequired
}

export default FullPostComponent;