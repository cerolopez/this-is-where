import React from "react";

function PostComponent() {

    return (
        <div className="container">
            <div className="row d-flex justify-content-center" id="post">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="card" id="postID">
                        <div className="card-body">
                         <a href="/"><h4>At the Philz on Middlefield</h4></a>
                         <p>testing 123</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default PostComponent;