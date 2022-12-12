import React from "react";
import PostComponent from "./PostComponent.js";
import PropTypes from "prop-types";
// import "../styles/CreatePost.css";

function PostsFeedComponent(props) {

    return (
        <>
            <div className="row d-flex justify-content-center post">
                <div className="col-md-1">
                    <p style={{ display: `${props.loadDisplay}` }}>Loading...</p>
                </div>
            </div>
            <div className="PostsFeed">
                {props.posts.map((p, i) => (
                    <PostComponent
                        key={`object_${i}`}
                        post={p}
                        fullDisplay={props.fullDisplay}
                        usersLikes={props.likes}
                        usersFavorites={props.faves}
                    ></PostComponent>
                ))}
            </div>
        </>
    );
}

PostsFeedComponent.propTypes = {
    fullDisplay: PropTypes.string.isRequired,
    loadDisplay: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    likes: PropTypes.array.isRequired,
    faves: PropTypes.array.isRequired

};

export default PostsFeedComponent;
