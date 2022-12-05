import React, { useState, useEffect } from "react";
import PostsFeed from "./PostsFeed.js";
import PropTypes from "prop-types";
import "./Pagination.css";

function Pagination(props) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [posts, setPosts] = useState([{}]);


    // const [globalPostsLength, setGlobalPostsLength] = useState(100);
    const [filteredPostsLength, setFilteredPostsLength] = useState(100);
    // const [initialRender, setInitialRender] = useState(true);
    // const [filteredLength, setFilteredLength] = useState(100); //TODO - change the other one to getPostsLength
    const [displayMsg, setDisplayMsg] = useState("");
    // const [numOfPagesRequired, setNumOfPagesRequired] = useState(1);
    // const [pageNumbersArr, setPageNumbersArr] = useState([]);
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
        async function reloadData() {
            let postInfo;

            const res = await fetch(
                `/getPosts?page=${page}&pageSize=${pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`
            );

            // let filteredLength;

            // console.log("city and type: ", props.selectedCity, props.selectedType);
            // if (props.selectedCity!== "All" && props.selectedType!== "All") {
            //     const lengthRes = await fetch(`/getFilteredPostsLength?page=${page}&pageSize=${pageSize}&selectedCity=${props.selectedCity}&selectedType=${props.selectedType}`);
            //     filteredLength = await lengthRes.json();
            //     console.log("setting filteredpostslength to ", filteredLength);
            //     setFilteredPostsLength(filteredLength);
            //  setPage(0);
            // }
            postInfo = await res.json();
            setPosts(postInfo);
            setFullDisplay("block");
            setLoadDisplay("none");
            // setNumOfPagesRequired(Math.ceil(filteredLength / pageSize));
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
        reloadData();
        const message = updateShowing();
        setDisplayMsg(message);
    }, [props, page, pageSize, filteredPostsLength]);

    // useEffect(() => {
    //     async function getLength() {
    //         const res = await fetch("/getPostsLength");
    //         const length = await res.json();
    //         setGlobalPostsLength(length);
    //         setFullDisplay("block");
    //         // let arr;
    //         setNumOfPagesRequired(Math.ceil(length / pageSize));
    //         if (length === filteredPostsLength) {
    //             setNumOfPagesRequired(Math.ceil(length / pageSize));
    //         } else {
    //             setNumOfPagesRequired(
    //                 Math.ceil(filteredPostsLength / pageSize)
    //             );
    //             setPage(0); //if filtering has happened, restart at first page
    //         }
    //         // arr = new Array(numOfPagesRequired);
    //         // for (let i = 0; i < arr.length; i++) {
    //         //     arr[i] = i;
    //         // }
    //         // setPageNumbersArr(arr);
    //     }
    //     getLength();
    // }, [pageSize, numOfPagesRequired, filteredPostsLength]);


//TODO - take functions out of use effect. call them during the other useeffect if filtering happens
    // useEffect(() => {
    //     function lastPostShown() {
    //         return parseInt(pageSize) * parseInt(page) + parseInt(pageSize);
    //     }
    //     function updateShowing() {
    //         const last = lastPostShown();
    //         let msg;

    //         if (last <= filteredPostsLength) {
    //             msg = `Showing ${parseInt(pageSize) * parseInt(page) + 1}-${
    //                 parseInt(pageSize) * parseInt(page) + parseInt(pageSize)
    //             } out of ${filteredPostsLength} posts`;
    //         } else {
    //             msg = `Showing ${
    //                 last - pageSize + 1
    //             }-${filteredPostsLength} out of ${filteredPostsLength} posts`;
    //         }

    //         return msg;
    //     }
    //     const message = updateShowing();
    //     setDisplayMsg(message);
    // }, [page, pageSize, filteredPostsLength]);

    // function getFilteredLength(length) {
    //     setFilteredPostsLength(length);
    // }

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
                page={page}
                pageSize={pageSize}
                selectedCity={props.selectedCity}
                selectedType={props.selectedType}
                fullDisplay={fullDisplay}
                loadDisplay={loadDisplay}
                // getFilteredLength={getFilteredLength}
                posts={posts}
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
                                        onClick={() =>
                                            setPage(Math.max(page - 1, 0))
                                        }
                                    >
                                        Previous
                                    </button>
                                </li>
                                {/*                    {pageNumbersArr.map((p) => (
                        <li className="page-item" key={`page_${p}`}>
                            <button className={page===p ? "page-link active" : "page-link"}  onClick={() => setPage(parseInt(p))}>{p+1}</button>
                        </li>
                    ))}*/}

                                <li className="page-item" key="next">
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setPage(
                                                Math.min(
                                                    page + 1,
                                                    filteredPostsLength
                                                )
                                            )
                                        }
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
}

Pagination.propTypes = {
    selectedCity: PropTypes.string.isRequired,
    selectedType: PropTypes.string.isRequired,
};

export default Pagination;
