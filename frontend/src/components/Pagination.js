import React, {useState, useEffect} from "react";
import PostsFeed from "./PostsFeed.js";

function Pagination(props) {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [globalPostsLength, setGlobalPostsLength] = useState(100);
    const [displayMsg, setDisplayMsg] = useState("");
    const [numOfPagesRequired, setNumOfPagesRequired] = useState(1);
    const [pageNumbersArr, setPageNumbersArr] = useState([]);

    useEffect(() => {
        async function getLength() {
            const res = await fetch("/getPostsLength");
            const length = await res.json();
            setGlobalPostsLength(length);
            setNumOfPagesRequired(Math.ceil(length/pageSize));
            const arr = new Array(numOfPagesRequired);
            for (let i = 0; i < arr.length; i++) {
                arr[i] = i;
            }
            setPageNumbersArr(arr);
        }
        getLength();
    }, [pageSize, numOfPagesRequired]);


    useEffect(() => {
        function lastPostShown() {
            return parseInt(pageSize) * parseInt(page) + parseInt(pageSize);
        }
        function updateShowing() {
            const last = lastPostShown();
            let msg;
            if (last <= globalPostsLength) {
                msg = `Showing ${parseInt(pageSize) * parseInt(page) + 1}-${parseInt(pageSize) * parseInt(page) + parseInt(pageSize)} out of ${globalPostsLength} posts`;
            } else {
                msg = `Showing ${last - pageSize + 1}-${globalPostsLength} out of ${globalPostsLength} posts`;
            }
            return msg;
        }
        const message = updateShowing();
        setDisplayMsg(message);

    }, [globalPostsLength, page, pageSize]); 

    return (
    <>   
        <br />
        <br />         
        <div className="row d-flex justify-content-center">
            <div className="col-md-12 text-center">
        <div> Show <select name={"PageSize"} id="pageSizeOptions" onChange={(event) => {
            setPageSize(event.target.value);
            setPage(0);
        }
        }>
        <option defaultValue={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        </select> results per page </div>
            </div>
        </div>
        <PostsFeed 
            page={page} 
            pageSize={pageSize} 
            selectedCity={props.selectedCity} 
            selectedType={props.selectedType}
            ></PostsFeed>
            <br />
            <br />
        <div className="row d-flex justify-content-center">
            <div className="col-md-3"></div>
            <div className="col-md-6">
        <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item" key="previous">
                        <button className="page-link" onClick={() => setPage(Math.max(page-1, 0))}>
                            Previous
                        </button>
                    </li>
                    {pageNumbersArr.map((p) => (
                        <li className="page-item" key={p}>
                            <button className={page===p ? "page-link active" : "page-link"}  onClick={() => setPage(p)}>{p+1}</button>
                        </li>
                    ))}

                    <li className="page-item" key="next">
                        <button className="page-link" onClick={() => setPage(Math.min(page+1, globalPostsLength))}>
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
            </>);
}

export default Pagination;