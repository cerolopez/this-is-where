import React, { useState, useEffect } from 'react';
import PostComponent from "./PostComponent.js";

export function PostsFeedComponent() {
    const [posts, setPosts] = useState([{ post: '' }]);
    const [fullDisplay, setFullDisplay] = useState("none");
    const [loadDisplay, setLoadDisplay] = useState("block");

    async function reloadData() {
        let postInfo;
        const res = await fetch("/getPosts");
        postInfo = await res.json();
        setPosts(postInfo);
        setFullDisplay("block");
        setLoadDisplay("none");
    }

    useEffect(
        () => {
        reloadData();
    }, []
    );

    return (

        <>
        <div className="row d-flex justify-content-center" id="post">
            <div className="col-md-1"><p style={{display: `${loadDisplay}`}}>Loading...</p></div>
        </div>
        <div className="PostsFeed">
            {posts.map((p, i) => (
                <PostComponent
                    key={`object_${i}`}
                    post={p}
                    likeCount={p.likeCount}
                    fullDisplay={fullDisplay}
                    reloadData={reloadData}
                    ></PostComponent>
            ))}
        </div>
        </>
    )
}

export default PostsFeedComponent;