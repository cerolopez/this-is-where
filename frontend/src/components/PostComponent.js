import React from "react";
import ViewPost from "../ViewPost.js"
import PropTypes from "prop-types";

function PostComponent({ post }) {
    console.log("Post: ", post);

    const handleLinkClick = async (evt, id) => {
        evt.preventDefault();
        
        console.log("testing event");
        console.log("id: ", id);

        const res = await fetch('/findPost/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const resData = await res.json();
        console.log("data: ", resData);

        ViewPost(resData);
    }



    return (
        <div className="container">
            <div className="row d-flex justify-content-center" id="post">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="card" id="postID">
                        <div className="card-body">
                         <a href="/view-post" onClick={event => handleLinkClick(event, '637a796c231e0bfe4ea85db3')}><h4>{post.location}</h4></a>
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
                                <h5 id="post-subtitle">Posted on test by <strong>test</strong></h5>
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