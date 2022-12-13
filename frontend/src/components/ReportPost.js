import React, { useState } from "react";
import PropTypes from "prop-types";

function ReportPost({ postId, setAlertVisibility }) {
  const [report, setReport] = useState("1");

  async function onSubmit() {
    console.log("button is submitted");

    const reportInfo = { postId: postId, reportType: report };
    const res = await fetch("/addReport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportInfo),
    });
    const resJson = await res.json();
    const res2 = await fetch(`/flagPost?id=${postId}`);
    const res2Json = await res2.json();
    if (!resJson.success || !res2Json.success) {
      console.log("Error sending report.");
    }
    setAlertVisibility("block");
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        aria-label="report post"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="currentColor" 
          className="bi bi-flag-fill" 
          viewBox="0 0 16 16">
          <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
        </svg>
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                I am reporting this post because:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <select
                className="form-select"
                aria-label="Report post options"
                onChange={(evt) => setReport(evt.target.value)}
              >
                <option defaultValue="1">
                  It contains hate speech or threats{" "}
                </option>
                <option value="2">
                  It contains profanity or offensive language
                </option>
                <option value="3">
                  It reveals somebody's private, sensitive information
                </option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
                aria-label="Cancel report"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-primary action-btn"
                data-bs-dismiss="modal"
                aria-label="Submit report"
              >
                Submit report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ReportPost.propTypes = {
  postId: PropTypes.string.isRequired,
  setAlertVisibility: PropTypes.func.isRequired,
};

export default ReportPost;
