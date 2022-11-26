import React, { useState, useEffect } from 'react';
import PostComponent from "./PostComponent.js";

export function PostsFeedComponent() {
    const [posts, setPosts] = useState([{ post: '' }]);

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

    async function getLikesByUser(postID) {
        const res = await fetch(`/checkIfLiked?id=${postID}`);
        const isLiked = await res.json();
        return isLiked;
    }

    async function getFavesByUser(postID) {
        const res = await fetch(`/checkIfFavorited?id=${postID}`);
        const isFavorited = await res.json();
        return isFavorited;
    }

    return (

        <div className="PostsFeed">
            {posts.map((p, i) => (
                <PostComponent
                    key={`object_${i}`}
                    post={p}
                    initLikeCount={p.likeCount}
                    getLikesByUser={getLikesByUser}
                    getFavesByUser={getFavesByUser}
                    ></PostComponent>
            ))}
        </div>
    )
}

export default PostsFeedComponent;