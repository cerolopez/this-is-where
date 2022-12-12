import React, { useState } from "react";

function PostForm() {
    const [postDisplay, setPostDisplay] = useState("none");
    const [successDisplay, setSuccessDisplay] = useState("none");
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [msg, setMsg] = useState("");

    async function onSubmit(evt) {
        evt.preventDefault();
        setPostDisplay("block");

        const newPostObj = {
            type,
            city,
            location,
            msg,
            timestamp: +new Date(),
        };

        const res = await fetch("/newPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPostObj),
        });

        const data = await res.json();
        console.log("post created: ", data);

        setPostDisplay("none");
        setSuccessDisplay("block");
        setTimeout(() => {
            window.location.replace(`/view-post?id=${data.postId}`);
        }, 2000);
    }

    return (
        <div className="card">
            <div className="card-body">
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
                                placeholder="Choose post type"
                                required
                            >
                                <option value="" selected disabled>
                                    --Please choose an option--
                                </option>
                                <option value="Memory" id="memory">
                                    Memory
                                </option>
                                <option value="Missed Connection">
                                    Missed Connection
                                </option>
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
                                placeholder="Choose city"
                                required
                            >
                                <option value="" selected disabled>
                                    --Please choose an option--
                                </option>
                                <option value="Alameda">Alameda</option>
                                <option value="Berkeley">Berkeley</option>
                                <option value="Burlingame">Burlingame</option>
                                <option value="Cupertino">Cupertino</option>
                                <option value="Daly City">Daly City</option>
                                <option value="Danville">Danville</option>
                                <option value="Foster City">Foster City</option>
                                <option value="Fremont">Fremont</option>
                                <option value="Gilroy">Gilroy</option>
                                <option value="Hayward">Hayward</option>
                                <option value="Livermore">Livermore</option>
                                <option value="Menlo Park">Menlo Park</option>
                                <option value="Milpitas">Milpitas</option>
                                <option value="Livermore">Livermore</option>
                                <option value="Mountain View">
                                    Mountain View
                                </option>
                                <option value="Oakland">Oakland</option>
                                <option value="Palo Alto">Palo Alto</option>
                                <option value="Redwood City">
                                    Redwood City
                                </option>
                                <option value="San Carlos">San Carlos</option>
                                <option value="San Francisco">
                                    San Francisco
                                </option>
                                <option value="San Jose">San Jose</option>
                                <option value="San Leandro">San Leandro</option>
                                <option value="San Mateo">San Mateo</option>
                                <option value="San Rafael">San Rafael</option>
                                <option value="Santa Clara">Santa Clara</option>
                                <option value="Saratoga">Saratoga</option>
                                <option value="Sunnyvale">Sunnyvale</option>
                                <option value="Union City">Union City</option>
                                <option value="Vallejo">Vallejo</option>
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="form-label" htmlFor="location">
                                Location
                            </label>
                            <input
                                className="form-control"
                                id="location"
                                name="location"
                                type="location"
                                placeholder="At the Philz in Middlefield"
                                value={location}
                                onChange={(evt) =>
                                    setLocation(evt.target.value)
                                }
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="message-text"
                            >
                                Message
                            </label>
                            <textarea
                                className="form-control"
                                id="message-text"
                                name="msg"
                                type="msg"
                                value={msg}
                                onChange={(evt) => setMsg(evt.target.value)}
                                placeholder="Type message"
                                required
                            ></textarea>
                        </div>
                        <br />
                        <div className="row justify-content-center">
                            <div className="col-md-5"></div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-dark action-btn">
                                    Submit
                                </button>
                            </div>
                            <div className="col-md-5"></div>
                        </div>
                        <br />
                        <div className="row justify-content-center">
                            <div className="col-md-12 text-center">
                                <p style={{ display: `${postDisplay}` }}>Loading...</p>
                                <p style={{ display: `${successDisplay}` }}>Success!</p>
                            </div>
                        </div>
                        <div></div>
                        <br />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostForm;
