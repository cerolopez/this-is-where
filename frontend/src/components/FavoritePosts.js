import React, {useState, useEffect} from "react";
import PostComponent from "./PostComponent.js";

function FavoritePosts() {

    const [fullDisplay, setFullDisplay] = useState("none");
    const [favoritePosts, setFavoritePosts] = useState([{ post: "" }]);
    const [loadDisplay, setloadDisplay] = useState("block");
    const [usersLikes, setUsersLikes] = useState([]);
    const [usersFavorites, setUsersFavorites] = useState([]);

    async function reloadData() {
        let data;

        try {
            const res = await fetch("/getFavoritePosts", {
                method: "GET",
            });
            data = await res.json();
        } catch (e) {
            console.log("error downloading data: ", e);
            return false;
        }

        setFavoritePosts(data);

        async function getLikesAndFavorites() {
            const likes = await fetch("/getLikes");
            const likesJson = await likes.json();

            const likesArray = likesJson.at(0).liked_posts;
            setUsersLikes(likesArray);
            const favorites = await fetch("/getFavorites");
            const favoritesJson = await favorites.json();
            const favoritesArray = favoritesJson.at(0).favorited_posts;
            setUsersFavorites(favoritesArray);
        }
        getLikesAndFavorites();

        setloadDisplay("none");
        setFullDisplay("block");
    }

    useEffect(() => {

        reloadData();
    }, []);

    return (
        <>
            <div className="row d-flex justify-content-center" id="post">
                <div className="col-md-1">
                    <p style={{ display: `${loadDisplay}` }}>Loading...</p>
                </div>
            </div>
            <div className="PostsFeed">
                {favoritePosts.map((p, i) => (
                    <PostComponent
                        key={`object_${i}`}
                        post={p}
                        fullDisplay={fullDisplay}
                        usersLikes={usersLikes}
                        usersFavorites={usersFavorites}
                    ></PostComponent>
                ))}
            </div>
        </>
    );
}

export default FavoritePosts;
