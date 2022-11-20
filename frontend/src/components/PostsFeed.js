import React, { useState, useEffect } from 'react';
import PostComponent from "./PostComponent.js";
// import PropTypes from 'prop-types';

function PostsFeedComponent() {
    const [posts, setPosts] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function reloadData() {
        let postInfo;
        const res = await fetch("/getPosts");
        postInfo = await res.json();
        console.log("data fetched: ", postInfo);

        setPosts(postInfo.posts);
    }

    useEffect(
        () => {
            reloadData();
            return () => {
                console.log("use effect ran");
            };
        }, 
        []
    );

    // this will represent a database object
    // const obj = {
    //     location: "At the Philz on Middlefield", 
    //     city: "Palo Alto, CA", 
    //     type: "Postcard",
    //     date: "November 18, 2022",
    //     username: "jeffreybezos",
    //     likeCount: "<3 23"
    // }

    // const obj2 = {
    //     location: "Near the snake statue at Cesar Chavez Park", 
    //     city: "San Jose, CA", 
    //     type: "Memory",
    //     date: "October 31, 2022",
    //     username: "eloniusmusk",
    //     likeCount: "<3 14"
    // }

    // const arrayOfObj = [obj, obj2];


    function testing(test) {
        console.log("testing this function");
        console.log("test: ", test);
        test.map((p, i) => {
            console.log("p:", p);
            console.log("i: ", i);
        })
    };

    testing(posts);

    return (
        // map out each of the posts using a bootstrap card
        // add the data as a child of PostComponent
        <div className="PostsFeed">
            {posts.map((p, i) => (
                <PostComponent
                    key={`object_${i}`}
                    post={p}
                    ></PostComponent>
            ))}
            {/* <PostComponent {postInfo[0]} /> */}
        </div>
    )
}


export default PostsFeedComponent;