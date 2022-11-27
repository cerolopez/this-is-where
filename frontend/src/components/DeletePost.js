import React from "react";
import {useNavigate} from "react-router-dom";

function DeletePost({ postID }) {
    const navigate = useNavigate();

    async function onSubmit() {
        const res = await fetch(`/deletePost?id=${postID}`);
        const data = await res.json();
        console.log("post deleted: ", data);

        navigate("/dashboard", {replace: true});
    }

    return (
        <>
<button type="button" className="btn btn-outline-dark btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal">
  Delete
</button>

<div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="deleteModalLabel">Delete Post</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Are you sure you want to delete your post?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" onClick={onSubmit} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default DeletePost;