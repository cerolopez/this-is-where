import React from "react";
import PostComponent from "../../components/PostComponent.js"

function PostFilters() {

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h5>Filter by</h5>
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-2">
                            <div className="btn-group">
                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                City
                                </button>
                                <ul className="dropdown-menu">
                                    { /* TODO: ADD QUERY LINKS */ }
                                    <li><a className="dropdown-item" href="/">San Jose</a></li>
                                    <li><a className="dropdown-item" href="/">San Francisco</a></li>
                                    <li><a className="dropdown-item" href="/">Mountain View</a></li>
                                    <li><a className="dropdown-item" href="/">Palo Alto</a></li>
                                    <li><a className="dropdown-item" href="/">Sunnyvale</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="btn-group">
                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Type
                                </button>
                                <ul className="dropdown-menu">
                                    { /* TODO: ADD QUERY LINKS */ }
                                    <li><a className="dropdown-item" href="/">Postcard</a></li>
                                    <li><a className="dropdown-item" href="/">Missed Connection</a></li>
                                    <li><a className="dropdown-item" href="/">Love Letter</a></li>
                                    <li><a className="dropdown-item" href="/">Compliment</a></li>
                                    <li><a className="dropdown-item" href="/">Memory</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="btn-group">
                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort
                                </button>
                                <ul className="dropdown-menu">
                                    { /* TODO: ADD QUERY LINKS */ }
                                    <li><a className="dropdown-item" href="/">Most recent</a></li>
                                    <li><a className="dropdown-item" href="/">Most popular</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
                {<PostComponent></PostComponent>}
            </div>
        </div>
    )
}

export default PostFilters;