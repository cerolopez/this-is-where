import React, { useState, useEffect } from 'react';
import PostComponent from "./PostComponent.js";
import PropTypes from "prop-types";

function PostsFeedComponent(props) {
    const [posts, setPosts] = useState([{ post: '' }]);
    const [fullDisplay, setFullDisplay] = useState("none");
    const [loadDisplay, setLoadDisplay] = useState("block");

    async function reloadData() {
        let postInfo;

        const res = await fetch(`/getPosts?page=${props.page}&pageSize=${props.pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`);
        postInfo = await res.json();

        // const lengthRes = await fetch(`/getFilteredPostsLength?page=${props.page}&pageSize=${props.pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`);
        // const filteredLength = await lengthRes.json();
        
        setPosts(postInfo);
        setFullDisplay("block");
        setLoadDisplay("none");
        // props.getFilteredLength(filteredLength);
    }

    useEffect(
        () => {
            async function reloadData() {
            let postInfo;

            const res = await fetch(`/getPosts?page=${props.page}&pageSize=${props.pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`);
            postInfo = await res.json();
            const lengthRes = await fetch(`/getFilteredPostsLength?page=${props.page}&pageSize=${props.pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`);
            const filteredLength = await lengthRes.json();

            setPosts(postInfo);
            setFullDisplay("block");
            setLoadDisplay("none");
            props.getFilteredLength(filteredLength);
    }
        reloadData();
    }, [props]
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
                    likeCount={p.likeCount || 0}
                    fullDisplay={fullDisplay}
                    reloadData={reloadData}
                    ></PostComponent>
            ))}
        </div>
        </>
    )
}

PostsFeedComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    selectedCity: PropTypes.string.isRequired,
    selectedType: PropTypes.string.isRequired,
    getFilteredLength: PropTypes.func.isRequired
}

export default PostsFeedComponent;