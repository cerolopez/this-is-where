import { useState } from 'react';

export default function PostForm() {
    const [formInfo, setFormInfo] = useState({
        type: "",
        location: "",
        city: "",
        message: ""
    });

    return (
        <div className="form-container">
            <form>
                <div>
                    <h1>Create Post</h1>
                </div>
                <div className="form-group">
                    <label for="locationInput">Location</label>
                    <input type="location" className="form-control" placeholder="Enter location"></input>
                </div>
                <button type="submit" className="btn btn-light">Submit</button>
            </form>
        </div>
    )
}