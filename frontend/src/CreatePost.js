import React from "react";
import PageTemplate from "./pages/PageTemplate.js";
import PostForm from "./components/PostForm.js";
import "./styles/CreatePost.css";

function CreatePost() {
    return (
        <div>
            <div className="container">
                <div className="row d-flex header-row content-row border">
                    {/* <div className="col-md-3"></div> */}
                    <div className="col-md-12 text-center">
                        <h1>Create Post</h1>
                    </div>
                    {/* <div className="col-md-3"></div> */}
                </div>
                <div className="row d-flex border content-row">
                    {/* <div className="col-md-3"></div> */}
                    <div className="col-md-12">
                        <PostForm></PostForm>
                    </div>
                    {/* <div className="col-md-3"></div> */}
                </div>
            </div>
            <PageTemplate></PageTemplate>
        </div>
    );
}

export default CreatePost;
