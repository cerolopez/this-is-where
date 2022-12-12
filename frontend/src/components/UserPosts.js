import React, {useState, useEffect} from "react";
import PostComponent from "./PostComponent.js";

function UserPosts() {

    const [fullDisplay, setFullDisplay] = useState("none");
    const [userPosts, setUserPosts] = useState([{ post: "" }]);
    const [loadDisplay, setloadDisplay] = useState("block");
    const [usersLikes, setUsersLikes] = useState([]);
    const [usersFavorites, setUsersFavorites] = useState([]);
    const [likesLoaded, setLikesLoaded] = useState(false);
    const [postsLoaded, setPostsLoaded] = useState(false);

    // async function reloadData() {
    //     let data;

    //     try {
    //         const res = await fetch("/getUserPosts", {
    //             method: "GET",
    //         });
    //         data = await res.json();
    //     } catch (e) {
    //         console.log("error downloading data: ", e);
    //         return false;
    //     }

    //     console.log("data: ", data);
    //     setUserPosts(data);
    //     setPostsLoaded(true);
    //     setloadDisplay("none");
    //     setFullDisplay("block");
    // }

    // async function getLikesAndFavorites() {
    //     const likes = await fetch("/getLikes");
    //     const likesJson = await likes.json();

    //     const likesArray = likesJson.at(0).liked_posts;
    //     setUsersLikes(likesArray);
    //     const favorites = await fetch("/getFavorites");
    //     const favoritesJson = await favorites.json();
    //     const favoritesArray = favoritesJson.at(0).favorited_posts;
    //     setUsersFavorites(favoritesArray);
    //     setLikesLoaded(true);
    // }

    useEffect(() => {
        let active = true;
        if (active) {
            async function reloadData() {
                let data;

                try {
                    const res = await fetch("/getUserPosts", {
                        method: "GET",
                    });
                    data = await res.json();
                } catch (e) {
                    console.log("error downloading data: ", e);
                    return false;
                }

                console.log("data: ", data);
                setUserPosts(data);
                setPostsLoaded(true);
                setloadDisplay("none");
                setFullDisplay("block");
            }
            async function getLikesAndFavorites() {
                const likes = await fetch("/getLikes");
                const likesJson = await likes.json();

                const likesArray = likesJson.at(0).liked_posts;
                console.log("here's the users likes: ", likesArray);
                setUsersLikes(likesArray);
                const favorites = await fetch("/getFavorites");
                const favoritesJson = await favorites.json();
                const favoritesArray = favoritesJson.at(0).favorited_posts;
                console.log("here's the users favorites: ", favoritesArray);
                setUsersFavorites(favoritesArray);
                setLikesLoaded(true);
            }

            reloadData();
            getLikesAndFavorites();
        }
        return () => { //cleanup
            active = false;
        };
    }, []);

    if (likesLoaded && postsLoaded) {
        return (
            <>
                <div className="row d-flex justify-content-center" id="post">
                    <div className="col-md-1">
                        <p style={{ display: `${loadDisplay}` }}>Loading...</p>
                    </div>
                </div>
                <div className="PostsFeed">
                    {userPosts.map((p, i) => (
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
}

export default UserPosts;
