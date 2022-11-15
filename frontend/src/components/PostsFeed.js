import React, { useState, useEffect } from 'react';
import PostComponent from "./PostComponent.js";

function PostsFeedComponent() {
    const [posts, setPosts] = useState([]);

    async function reloadData() {
        // TODO: add route
        const res = await fetch("add-route-here");
        const data = await res.json();

        // do something with the data here
        
        return data;
    }

    useEffect(
        () => {
            reloadData();
    },
    [] // array of parameters
    );

    return (
        // map out each of the posts using a bootstrap card
        // add the data as a child of PostComponent
        <div className="PostsFeed">
            <PostComponent>
            </PostComponent>
        </div>
    )
}

export default PostsFeedComponent;