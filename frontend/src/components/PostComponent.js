import React from "react";
import ViewPost from "../ViewPost.js"
import PropTypes from "prop-types";

function PostComponent({ post }) {

    const handleLinkClick = async (evt, id) => {
        evt.preventDefault();

        window.location.replace('/view-post?id=' + id);
    }



    return (
        <div className="container">
            <div className="row d-flex justify-content-center" id="post">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="card" id="postID">
                        <div className="card-body">
                         <a href="/view-post" onClick={event => handleLinkClick(event, `${post._id}`)}><h4>{post.location}</h4></a>
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
        </div>
    )
}

PostComponent.propTypes = {
    post: PropTypes.object.isRequired
}

export default PostComponent;