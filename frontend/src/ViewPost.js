import React from 'react';
import PageTemplate from "./pages/PageTemplate.js"
import FullPostComponent from "./components/FullPostComponent.js"

function ViewPost(object) {

    console.log(object);

    const postInfo = {
        location: "Near the snake statue at Cesar Chavez Park", 
        city: "San Jose, CA", 
        type: "Memory",
        date: "October 31, 2022",
        username: "eloniusmusk",
        likeCount: "<3 14"
    }

    return (
        <div>
        <div className="container">
            <div className="row d-flex header-row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <h1>View Post</h1>
            </div>
            <div className="col-md-3"></div>
            </div>
            <div className="row d-flex">
                <div className="col-md-3"></div>
                <div className="col-md-12">
                    <FullPostComponent {...postInfo} />
                </div>
                <div className="col-md-3"></div>
            </div>
            </div>
            <PageTemplate></PageTemplate>
        </div>
    )
}

export default ViewPost;