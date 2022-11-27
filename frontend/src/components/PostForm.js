import React, { useState } from 'react';
//import PropTypes from "prop-types";

function PostForm() {
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [msg, setMsg] = useState("");

    async function onSubmit(evt) {
        evt.preventDefault();

        const newPostObj = {
            type,
            city,
            location,
            msg,
            timestamp: +new Date()
        }

        const res = await fetch("/newPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPostObj)
        });

        const data = await res.json();
        console.log("post created: ", data);
        setTimeout(() => {
            window.location.replace("dashboard");
        }, 2000);
    }

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="type-select">
                        Post type
                    </label>
                    <select 
                    className="form-select" 
                    id="type-select"
                    name="type"
                    type="type"
                    value={type}
                    onChange={(evt) => setType(evt.target.value)}
                    placeholder="Choose post type">
                        <option defaultValue>--Please choose an option--</option>
                        <option value="Memory" id="memory">Memory</option>
                        <option value="Missed Connection">Missed Connection</option>
                        <option value="Postcard">Postcard</option>
                        <option value="Love Letter">Love Letter</option>
                        <option value="Compliment">Compliment</option>
                        <option value="Freestyle">Freestyle</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <label className="form-label" htmlFor="city-select">
                        City
                    </label>
                    <select 
                    className="form-select" 
                    id="city-select"
                    name="city"
                    type="city"
                    value={city}
                    onChange={(evt) => setCity(evt.target.value)}
                    placeholder="Choose city">
                        <option defaultValue>--Please choose an option--</option>
                        <option value="San Jose">San Jose</option>
                        <option value="Palo Alto">Palo Alto</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="Mountain View">Mountain View</option>
                    </select>
                </div>
            <br />
            <div className="form-group">
                    <label className="form-label" htmlFor="location">
                        Title
                    </label>
                    <input 
                    className="form-control" 
                    id="location"
                    name="location"
                    type="location"
                    placeholder="At the Philz in Middlefield"
                    value={location}
                    onChange={(evt) => setLocation(evt.target.value)}
                    required
                    />
                </div>
                <br />
                <div className="form-group">
                    <label className="form-label" htmlFor="message-text">
                        Message
                    </label>
                    <textarea 
                    className="form-control" 
                    id="message-text"
                    name="msg"
                    type="msg"
                    value={msg}
                    onChange={(evt) => setMsg(evt.target.value)}
                    placeholder="Type message">
                    </textarea>
                </div>
                <br />
                <div className="form-group" id="date">
                    <label className="form-label" htmlFor="type-select">
                        Date
                    </label>
                    <input 
                    className="form-control" 
                    id="type-select"
                    name="date"
                    type="date"
                    placeholder="Choose date"
                    value={date}
                    onChange={(evt) => setDate(evt.target.value)}
                    >
                    </input>
                </div>
                <br />
                <button type="submit" className="btn btn-light">Submit</button>
            </form>
        </div>
    )
}

// PostForm.propTypes = {
//     onCreatePost: PropTypes.func.isRequired,
// }

export default PostForm;