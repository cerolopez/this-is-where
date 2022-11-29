import React, { useState, useEffect } from "react";
import PostsFeed from "./PostsFeed.js";
import PropTypes from "prop-types";
import "./Pagination.css";

function Pagination(props) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [globalPostsLength, setGlobalPostsLength] = useState(100);
    const [filteredPostsLength, setFilteredPostsLength] = useState(100);
    const [displayMsg, setDisplayMsg] = useState("");
    const [numOfPagesRequired, setNumOfPagesRequired] = useState(1);
    // const [pageNumbersArr, setPageNumbersArr] = useState([]);
    const [fullDisplay, setFullDisplay] = useState("none");

    useEffect(() => {
        async function getLength() {
            const res = await fetch("/getPostsLength");
            const length = await res.json();
            setGlobalPostsLength(length);
            setFullDisplay("block");
            // let arr;
            setNumOfPagesRequired(Math.ceil(length / pageSize));
            if (length === filteredPostsLength) {
                setNumOfPagesRequired(Math.ceil(length / pageSize));
            } else {
                setNumOfPagesRequired(
                    Math.ceil(filteredPostsLength / pageSize)
                );
                setPage(0); //if filtering has happened, restart at first page
            }
            // arr = new Array(numOfPagesRequired);
            // for (let i = 0; i < arr.length; i++) {
            //     arr[i] = i;
            // }
            // setPageNumbersArr(arr);
        }
        getLength();
    }, [pageSize, numOfPagesRequired, filteredPostsLength]);

    useEffect(() => {
        function lastPostShown() {
            return parseInt(pageSize) * parseInt(page) + parseInt(pageSize);
        }
        function updateShowing() {
            const last = lastPostShown();
            let msg;
            if (globalPostsLength === filteredPostsLength) {
                if (last <= filteredPostsLength) {
                    msg = `Showing ${parseInt(pageSize) * parseInt(page) + 1}-${
                        parseInt(pageSize) * parseInt(page) + parseInt(pageSize)
                    } out of ${filteredPostsLength} posts`;
                } else {
                    msg = `Showing ${
                        last - pageSize + 1
                    }-${filteredPostsLength} out of ${filteredPostsLength} posts`;
                }
            } else {
                if (last <= filteredPostsLength) {
                    msg = `Showing ${parseInt(pageSize) * parseInt(page) + 1}-${
                        parseInt(pageSize) * parseInt(page) + parseInt(pageSize)
                    } out of ${filteredPostsLength} posts`;
                } else {
                    msg = `Showing ${
                        last - pageSize + 1
                    }-${filteredPostsLength} out of ${filteredPostsLength} posts`;
                }
            }
            return msg;
        }
        const message = updateShowing();
        setDisplayMsg(message);
    }, [globalPostsLength, page, pageSize, filteredPostsLength]);

    function getFilteredLength(length) {
        setFilteredPostsLength(length);
    }

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
                getFilteredLength={getFilteredLength}
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
                                                    globalPostsLength
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
