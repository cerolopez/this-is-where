import React, { useState, useEffect } from "react";
import PostComponent from "./PostComponent.js";
import PropTypes from "prop-types";

function PostsFeedComponent(props) {


    return (
        <>
            <div className="row d-flex justify-content-center" id="post">
                <div className="col-md-1">
                    <p style={{ display: `${props.loadDisplay}` }}>Loading...</p>
                </div>
            </div>
            <div className="PostsFeed">
                {props.posts.map((p, i) => (
                    <PostComponent
                        key={`object_${i}`}
                        post={p}
                        likeCount={p.likeCount}
                        fullDisplay={props.fullDisplay}
                        // reloadData={props.reloadData}
                        usersLikes={props.likes}
                        usersFavorites={props.faves}
                    ></PostComponent>
                ))}
            </div>
        </>
    );
}

PostsFeedComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    selectedCity: PropTypes.string.isRequired,
    selectedType: PropTypes.string.isRequired,
    getFilteredLength: PropTypes.func.isRequired,
};

export default PostsFeedComponent;
