import React, { useState, useEffect } from 'react';
import PostComponent from "./PostComponent.js";

export function PostsFeedComponent() {
    const [posts, setPosts] = useState([{ post: '' }]);

    async function reloadData() {
        let postInfo;
        const res = await fetch("/getPosts");
        postInfo = await res.json();
        setPosts(postInfo);
    }

    useEffect(
        () => {
        reloadData();
    }, []
    );

    return (

        <div className="PostsFeed">
            {posts.map((p, i) => (
                <PostComponent
                    key={`object_${i}`}
                    post={p}
                    reloadData={reloadData}
                    ></PostComponent>
            ))}
        </div>
    )
}

export default PostsFeedComponent;