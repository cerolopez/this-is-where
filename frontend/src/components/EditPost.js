import React, { useState } from "react";
import PropTypes from "prop-types";

function EditPost({ post, reloadData, setEditDisplay }) {
  const [newLocation, setNewLocation] = useState("");
  const [newMsg, setNewMsg] = useState("");

  const onLocationChange = (evt) => {
    setNewLocation(evt.target.value);
  };

  const onMsgChange = (evt) => {
    setNewMsg(evt.target.value);
  };

  async function onSubmit() {
    let newEdits = { postId: post._id, location: newLocation, body: newMsg };

    if (newLocation === "") {
      newEdits = { postId: post._id, location: post.location, body: newMsg };
    }

    if (newMsg === "") {
      newEdits = { postId: post._id, location: newLocation, body: post.body };
    }

    setEditDisplay("block");
    const res = await fetch("/editPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEdits),
    });
    const data = await res.json();
    console.log("success: ", data);

    reloadData();
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        aria-label="Edit post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
        </svg>
      </button>
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">
                Edit Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="location-name" className="col-form-label">
                    Location:
                  </label>
                  <input
                    onChange={onLocationChange}
                    type="text"
                    className="form-control"
                    id="location-name"
                    value={newLocation}
                    placeholder={post.location}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    onChange={onMsgChange}
                    className="form-control"
                    id="message-text"
                    value={newMsg}
                    placeholder={post.body}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                className="btn action-btn"
                data-bs-dismiss="modal"
              >
                Submit Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired,
  setEditDisplay: PropTypes.func.isRequired,
};

export default EditPost;
