import React from "react";

function FullPostComponent(object) {

    return (
        <div className="container">
            <div className="row d-flex justify-content-center" id="post">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="card" id="postID">
                        <div className="card-body">
                         <h4 className="card-title">{object.location}</h4>
                         <div className="row justify-content-start">
                            <div className="col-md-3">
                                <span className="badge bg-secondary">{object.city}</span>
                            </div>
                            <div className="col-md-3">
                                <span className="badge bg-secondary">{object.type}</span>
                            </div>
                         </div>
                         <br />
                         <div className="row">
                            <div className="col-md-12">
                                <p>{object.body}</p>
                            </div>
                         </div>
                         <br />
                         <div className="row">
                            <div className="col-md-12">
                                <h5 id="post-subtitle">Posted on {object.date} by <strong>{object.username}</strong></h5>
                            </div>
                         </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default FullPostComponent;