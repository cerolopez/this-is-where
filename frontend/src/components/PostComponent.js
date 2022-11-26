import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
//import ViewPost from "../ViewPost";

function PostComponent({ post }) {
    const navigate = useNavigate();
    const [isLikedByUser, setIsLikedByUser] = useState();
    const [isFavoritedByUser, setIsFavoritedByUser] = useState();
    const [isFlaggedByUser, setIsFlaggedByUser] = useState();

    useEffect(() => {
        async function getAuth() {
          const res = await fetch("/getAuthentication");
          const resJson = await res.json();
          if (resJson.authenticated) {
            console.log("user is authenticated.");
            navigate("/dashboard", {replace: true});
          } else {
            console.log("user is not authenticated.");
          }
        }
        getAuth();
      })

    function handleLinkClick(evt, id) {
        console.log("I'm in handleLinkClick");
        evt.preventDefault();
        navigate(`/view-post?id=${id}`, {replace: false});
    };

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