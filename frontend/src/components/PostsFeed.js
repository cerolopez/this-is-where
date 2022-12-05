import React, { useState, useEffect } from "react";
import PostComponent from "./PostComponent.js";
import PropTypes from "prop-types";

function PostsFeedComponent(props) {
    // const [posts, setPosts] = useState([{ post: "" }]);
    // const [fullDisplay, setFullDisplay] = useState("none");
    // const [loadDisplay, setLoadDisplay] = useState("block");
    const [usersLikes, setUsersLikes] = useState([]);
    const [usersFavorites, setUsersFavorites] = useState([]);
    console.log("props.posts: ", props.posts);

    useEffect(() => {
        async function getLikesAndFavorites() {
            const likes = await fetch("/getLikes");
            const likesJson = await likes.json();

            // console.log("likeJson: ", likesJson);
            const likesArray = likesJson.at(0).liked_posts;
            // console.log("likesArray: ", likesArray);
            setUsersLikes(likesArray);
            const favorites = await fetch("/getFavorites");
            const favoritesJson = await favorites.json();
            const favoritesArray = favoritesJson.at(0).favorited_posts;
            setUsersFavorites(favoritesArray);
        }
        getLikesAndFavorites();
    }, []);

    // async function reloadData() {
    //     let postInfo;

    //     const res = await fetch(
    //         `/getPosts?page=${props.page}&pageSize=${props.pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`
    //     );
    //     postInfo = await res.json();

    //     // const lengthRes = await fetch(`/getFilteredPostsLength?page=${props.page}&pageSize=${props.pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`);
    //     // const filteredLength = await lengthRes.json();

    //     setPosts(postInfo);
    //     setFullDisplay("block");
    //     setLoadDisplay("none");
    //     // props.getFilteredLength(filteredLength);
    // }

    // useEffect(() => {
    //     async function reloadData() {
    //         let postInfo;

    //         const res = await fetch(
    //             `/getPosts?page=${props.page}&pageSize=${props.pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`
    //         );
    //         postInfo = await res.json();
    //         const lengthRes = await fetch(
    //             `/getFilteredPostsLength?page=${props.page}&pageSize=${props.pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`
    //         );
    //         const filteredLength = await lengthRes.json();

    //         setPosts(postInfo);
    //         setFullDisplay("block");
    //         setLoadDisplay("none");
    //         props.getFilteredLength(filteredLength);
    //     }
    //     reloadData();
    // }, [props]);

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
                        likeCount={p.likeCount || 0}
                        fullDisplay={props.fullDisplay}
                        loadDisplay={props.loadDisplay}
                        // reloadData={reloadData}
                        // isLiked={usersLikes.includes(p._id)}
                        // isFavorited={usersFavorites.includes(p._id)}
                        usersLikes={usersLikes}
                        usersFavorites={usersFavorites}
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
