import React, { useState, useEffect } from 'react';
import PostComponent from "./PostComponent.js";

function PostsFeedComponent() {
    const [posts, setPosts] = useState([{ post: 'test' }]);

    useEffect(
        () => {
            async function reloadData() {
                let postInfo;
                const res = await fetch("/getPosts");
                postInfo = await res.json();
                setPosts(postInfo);
            }
        reloadData();
    }, []
    );

    return (

        <div className="PostsFeed">
            {posts.map((p, i) => (
                <PostComponent
                    key={`object_${i}`}
                    post={p}
                    ></PostComponent>
            ))}
        </div>
    )
}

export default PostsFeedComponent;