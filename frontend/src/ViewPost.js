import React, { useEffect, useState } from "react";
import PageTemplate from "./pages/PageTemplate.js";
import FullPostComponent from "./components/FullPostComponent.js";
import { Link } from "react-router-dom";

function ViewPost() {
    const [post, setPost] = useState({});
    const [modDisplay, setModDisplay] = useState("none");
    const [fullDisplay, setFullDisplay] = useState("none");
    const [loadDisplay, setloadDisplay] = useState("block");

    async function reloadData() {
        let resData;
        let data;

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");

        try {
            const res = await fetch(`/getPost?id=${id}`, {
                method: "GET",
            });
            data = await res.json();
            console.log("here's the data: ", data);
        } catch (e) {
            console("error downloading data: ", e);
            return false;
        }
        console.log("data.at(0): ", data.at(0));

        setPost(data.at(0));

        try {
            const res = await fetch("/getUsername");
            resData = await res.json();
        } catch (e) {
            console.log("error getting current user", e);
        }

        if (resData.username === data.at(0).username) {
            setModDisplay("block");
        } else {
            setModDisplay("none");
        }

        setFullDisplay("block");
        setloadDisplay("none");
    }

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row d-flex header-row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h1>View Post</h1>
                        <Link to="/dashboard">Back</Link>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-1">
                        <p style={{ display: `${loadDisplay}` }}>Loading...</p>
                    </div>
                </div>
                <div className="row d-flex">
                    <div className="col-md-3"></div>
                    <div className="col-md-12">
                        <FullPostComponent
                            post={post}
                            modDisplay={modDisplay}
                            fullDisplay={fullDisplay}
                            reloadData={reloadData}
                        />
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
            <PageTemplate></PageTemplate>
        </div>
    );
}

export default ViewPost;
