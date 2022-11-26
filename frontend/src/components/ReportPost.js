import React, { useState, useEffect } from "react";

function ReportPost() {


  async function onSubmit(evt) {
    evt.preventDefault();
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
              >
                {/*<option selected>I am reporting this post because:</option>*/}
                <option selected value="1">It contains hate speech or threats </option>
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
              <button type="submit" className="btn btn-primary">
                Submit report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportPost;