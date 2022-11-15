import React from 'react';
import PageTemplate from "./pages/PageTemplate.js"
import PostForm from "./components/PostForm.js"

const CreatePost = () => {
    return (
        <div>
        <div className="container">
            <div className="row d-flex header-row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <h1>Create Post</h1>
            </div>
            <div className="col-md-3"></div>
            </div>
            <div className="row d-flex">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <PostForm></PostForm>
                </div>
                <div className="col-md-3"></div>
            </div>
            </div>
            <PageTemplate></PageTemplate>
        </div>
    )
}

export default CreatePost;