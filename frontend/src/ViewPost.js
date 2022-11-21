import React, { useEffect, useState } from 'react';
import PageTemplate from "./pages/PageTemplate.js"
import FullPostComponent from "./components/FullPostComponent.js"

function ViewPost() {
    const [post, setPost] = useState({});

    async function reloadData() {
        let data;

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        console.log("here's the ID in the URL: ", id);

        try {
            const res = await fetch(`/getPost?id=${id}`, {
                method: 'GET'
            });
            data = await res.json();
            console.log("here's the data: ", data);
        } catch (e) {
            console("error downloading data: ", e);
            return false;
        }

        setPost(data.at(0));

    }

    useEffect(
        () => {
            reloadData();
        }, []
    );

    return (
        <div>
        <div className="container">
            <div className="row d-flex header-row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <h1>View Post</h1>
                <a href="/dashboard">Back</a>
            </div>
            <div className="col-md-3"></div>
            </div>
            <div className="row d-flex">
                <div className="col-md-3"></div>
                <div className="col-md-12">
                    <FullPostComponent {...post} />
                </div>
                <div className="col-md-3"></div>
            </div>
            </div>
            <PageTemplate></PageTemplate>
        </div>
    )
}

export default ViewPost;