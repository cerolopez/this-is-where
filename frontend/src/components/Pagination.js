import React, { useState, useEffect } from "react";
import PostsFeed from "./PostsFeed.js";
import PropTypes from "prop-types";
import "./Pagination.css";

function Pagination(props) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [posts, setPosts] = useState([]);
    const [usersLikes, setUsersLikes] = useState([]);
    const [usersFavorites, setUsersFavorites] = useState([]);
    const [postsLoaded, setPostsLoaded] = useState(false);
    const [likesLoaded, setLikesLoaded] = useState(false);


    const [filteredPostsLength, setFilteredPostsLength] = useState(100);

    const [displayMsg, setDisplayMsg] = useState("");

    const [fullDisplay, setFullDisplay] = useState("none");
    const [loadDisplay, setLoadDisplay] = useState("block");

    useEffect(() => {
        async function getInitialLength() {
            const res = await fetch(`/getFilteredPostsLength?page=0&pageSize=5&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`);
            const length = await res.json();
            setFilteredPostsLength(length);
            setPage(0);
            let msg;
            if (length > 0 && length < 5) {
                msg = `Showing 1-${length} out of ${length} posts`;
            }
            else if (length === 0) {
                msg = "No posts to display.";
            } else {
                msg = `Showing 1-5 out of ${length} posts`;
            }
            setDisplayMsg(msg);
        }

        getInitialLength();
    }, [props.selectedCity, props.selectedType]);

    useEffect(() => {
        let active = true;
        if (active) {
            async function reloadData() {
                let postInfo;

                const res = await fetch(
                    `/getPosts?page=${page}&pageSize=${pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`
                );

                postInfo = await res.json();
                setPosts(postInfo);
                setFullDisplay("block");
                setLoadDisplay("none");
                setPostsLoaded(true);
            }
            function lastPostShown() {
                return parseInt(pageSize) * parseInt(page) + parseInt(pageSize);
            }
            function updateShowing() {
                const last = lastPostShown();
                let msg;

                if (last <= filteredPostsLength) {
                    msg = `Showing ${parseInt(pageSize) * parseInt(page) + 1}-${
                        parseInt(pageSize) * parseInt(page) + parseInt(pageSize)
                    } out of ${filteredPostsLength} posts`;
                } else {
                    msg = `Showing ${
                        last - pageSize + 1
                    }-${filteredPostsLength} out of ${filteredPostsLength} posts`;
                }

                return msg;
            }
            async function getLikesAndFavorites() {
                const likes = await fetch("/getLikes");
                const likesJson = await likes.json();

                const likesArray = likesJson.at(0).liked_posts;
                setUsersLikes(likesArray);
                const favorites = await fetch("/getFavorites");
                const favoritesJson = await favorites.json();
                const favoritesArray = favoritesJson.at(0).favorited_posts;
                setUsersFavorites(favoritesArray);
                setLikesLoaded(true);
            }
            getLikesAndFavorites();
            reloadData();
            const message = updateShowing();
            setDisplayMsg(message);
        }
        return () => { //cleanup
            active = false;
        };
    }, [props, page, pageSize, filteredPostsLength]);



    if (likesLoaded && postsLoaded) {


    return (
        <>
            <br />
            <br />
            <div className="row d-flex justify-content-center">
                <div className="col-md-12 text-center">
                    <div>
                        <span style={{ display: `${fullDisplay}` }}>
                            {" "}
                            Show{" "}
                            <select
                                name={"PageSize"}
                                id="pageSizeOptions"
                                aria-label="Select page size"
                                onChange={(event) => {
                                    setPageSize(event.target.value);
                                    setPage(0);
                                }}
                            >
                                <option defaultValue={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>{" "}
                            results per page{" "}
                        </span>
                    </div>
                </div>
            </div>
            <PostsFeed
                // page={page}
                // pageSize={pageSize}
                // selectedCity={props.selectedCity}
                // selectedType={props.selectedType}
                fullDisplay={fullDisplay}
                loadDisplay={loadDisplay}
                posts={posts}
                likes={usersLikes}
                faves={usersFavorites}
            ></PostsFeed>
            <br />
            <br />
            <span style={{ display: `${fullDisplay}` }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                                <li className="page-item" key="previous">
                                    <button
                                        className="page-link"
                                        onClick={() => {
                                            setPage(Math.max(page - 1, 0));
                                            setPostsLoaded(false);
                                            setLikesLoaded(false);
                                        }}
                                    >
                                        Previous
                                    </button>
                                </li>

                                <li className="page-item" key="next">
                                    <button
                                        className="page-link"
                                        onClick={() => {
                                            setPage(Math.min(page + 1, filteredPostsLength));
                                            setPostsLoaded(false);
                                            setLikesLoaded(false);
                                        }}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 text-center">{displayMsg}</div>
                    <div className="col-md-3"></div>
                </div>
            </span>
        </>
    );
    } else {
        return (            <PostsFeed
                // page={page}
                // pageSize={pageSize}
                // selectedCity={props.selectedCity}
                // selectedType={props.selectedType}
                fullDisplay={fullDisplay}
                loadDisplay={loadDisplay}
                posts={posts}
                likes={usersLikes}
                faves={usersFavorites}
            ></PostsFeed>);
    }
}

Pagination.propTypes = {
    selectedCity: PropTypes.string.isRequired,
    selectedType: PropTypes.string.isRequired,
};

export default Pagination;
