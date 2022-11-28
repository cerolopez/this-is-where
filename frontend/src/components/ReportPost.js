import React, { useState } from "react";
import PropTypes from "prop-types";

function ReportPost({postId, setAlertVisibility}) {
  const [report, setReport] = useState("1");


  async function onSubmit() {
    console.log("button is submitted");

    const reportInfo = {postId: postId, reportType: report};
    const res = await fetch("/addReport", 
      {method: "POST", headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify(reportInfo)});
    const resJson = await res.json();
    const res2 = await fetch(`/flagPost?id=${postId}`);
    const res2Json = await res2.json();
    if (!resJson.success || !res2Json.success) {console.log("Error sending report.")};
    setAlertVisibility("block");

  }

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Report post
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
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
                <option defaultValue="1">It contains hate speech or threats </option>
                <option value="2">It contains profanity or offensive language</option>
                <option value="3">It reveals somebody's private, sensitive information</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" onClick={onSubmit} className="btn btn-primary" data-bs-dismiss="modal">
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
  setAlertVisibility: PropTypes.func.isRequired
}

export default ReportPost;