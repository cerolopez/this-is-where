import { MongoClient, ObjectId } from "mongodb";

function postsDB() {
    const postsDB = {};
    const DB_NAME = "ThisIsWhereDatabase";
    const POSTS_COLLECTION = "Posts";

    postsDB.createPost = async function (postInfo = {}, user) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCollection = client
                .db(DB_NAME)
                .collection(POSTS_COLLECTION);
            const newPost = {
                city: postInfo.city,
                location: postInfo.location,
                body: postInfo.msg,
                date: postInfo.timestamp,
                type: postInfo.type,
                username: user,
                isHidden: false,
                flaggedBy: [],
                reports: [],
                likeCount: 0,
            };
            const res = await postsCollection.insertOne(newPost);
            return res;
        } finally {
            client.close();
        }
    };

    postsDB.createFakePost = async function (fakePost) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCollection = client
                .db(DB_NAME)
                .collection(POSTS_COLLECTION);
            console.log("Inserting fake post: ", fakePost);
            const res = await postsCollection.insertOne(fakePost);
            if (res.acknowledged) {
                return { success: true };
            }
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    };

    postsDB.getPostsLength = async function () {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;
        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCollection = client
                .db(DB_NAME)
                .collection(POSTS_COLLECTION);
            const res = await postsCollection.find().project({_id:1}).toArray();
            const length = res.length;
            return length;
        } catch (e) {
            console.err(e);
        } finally {
            await client.close();
        }
    };

    postsDB.getFilteredLength = async function (
        page,
        page_size,
        cityFilter,
        typeFilter
    ) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;
        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCol = client.db(DB_NAME).collection(POSTS_COLLECTION);
            let res;
            if (cityFilter === "All" && typeFilter === "All") {
                res = await postsCol.find().project({_id:1}).toArray();
            } else if (cityFilter !== "All" && typeFilter === "All") {
                res = await postsCol.find({ city: cityFilter }).project({_id:1}).toArray();
            } else if (cityFilter === "All" && typeFilter !== "All") {
                res = await postsCol.find({ type: typeFilter }).project({_id:1}).toArray();
            } else {
                res = await postsCol
                    .find({ city: cityFilter, type: typeFilter })
                    .project({_id:1})
                    .toArray();
            }
            return res.length;
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    };

    postsDB.getPosts = async function (
        page,
        page_size,
        cityFilter,
        typeFilter
    ) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;
        const projection = {_id:1, city:1, location:1, body:1, date:1, type:1, username:1, likeCount:1};

        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCol = client.db(DB_NAME).collection(POSTS_COLLECTION);
            let res;

            if (cityFilter === "All" && typeFilter === "All") {
                res = await postsCol
                    .find()
                    .project(projection)
                    .hint({ $natural: -1 })
                    .skip(page * page_size)
                    .limit(page_size)
                    .toArray();
            } else if (cityFilter !== "All" && typeFilter === "All") {
                res = await postsCol
                    .find({ city: cityFilter })
                    .project(projection)
                    .hint({ $natural: -1 })
                    .skip(page * page_size)
                    .limit(page_size)
                    .toArray();
            } else if (cityFilter === "All" && typeFilter !== "All") {
                res = await postsCol
                    .find({ type: typeFilter })
                    .project(projection)
                    .hint({ $natural: -1 })
                    .skip(page * page_size)
                    .limit(page_size)
                    .toArray();
            } else {
                res = await postsCol
                    .find({ city: cityFilter, type: typeFilter })
                    .project(projection)
                    .hint({ $natural: -1 })
                    .skip(page * page_size)
                    .limit(page_size)
                    .toArray();
            }

            return res;
        } finally {
            client.close();
        }
    };

    // executes when a user clicks on a post card
    postsDB.getPost = async function (postID = {}) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;
        const projection = {_id:1, city:1, location:1, body:1, date:1, type:1, username:1, likeCount:1};

        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCollection = client
                .db(DB_NAME)
                .collection(POSTS_COLLECTION);
            const res = await postsCollection
                .find({
                    _id: ObjectId(`${postID}`),
                })
                .project(projection)
                .toArray();

            return res;
        } finally {
            client.close();
        }
    };

    postsDB.editPost = async function (postID, postLocation, postBody) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            await postsCollection.updateOne(
                { _id: ObjectId(`${postID}`) },
                { $set: { location: postLocation, body: postBody } },
                { upsert: true }
            );

            return true;
        } finally {
            client.close();
        }
    };

    postsDB.deletePost = async function (postID) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            await postsCollection.deleteOne({
                _id: ObjectId(`${postID}`),
            });

            return true;
        } finally {
            client.close();
        }
    };

    postsDB.flagPost = async function (postID = {}, userId) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateOne(
                {
                    _id: ObjectId(`${postID}`),
                },
                { $push: { flaggedBy: userId } }
            );

            return true;
        } finally {
            client.close();
        }
    };

    postsDB.likePost = async function (postID = {}) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateOne(
                {
                    _id: ObjectId(`${postID}`),
                },
                {
                    $inc: { likeCount: 1 },
                }
            );

            return true;
        } finally {
            client.close();
        }
    };

    postsDB.unlikePost = async function (postID = {}) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateOne(
                {
                    _id: ObjectId(`${postID}`),
                },
                {
                    $inc: { likeCount: -1 },
                }
            );

            return true;
        } finally {
            client.close();
        }
    };

    //When a user submits a report, the report type sent will be 1, 2, or 3
    postsDB.addReport = async function (postId, reportType) {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateOne(
                { _id: ObjectId(`${postId}`) },
                { $push: { reports: reportType } }
            );
            if (res.acknowledged) {
                return { success: true, msg: "Successfully added report" };
            } else {
                return { success: false, msg: "Could not add report" };
            }
        } catch (e) {
            console.error(e);
            return { success: false, msg: "Error adding report", err: e };
        } finally {
            await client.close();
        }
    };



    postsDB.resetAllPostLikes = async function () {
        const uri = process.env.DB_URI || "mongodb://localhost:27017";
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateMany({}, {$set: {likeCount: 0}});
            if (res.acknowledged) {
                return { success: true, msg: "Successfully reset likes" };
            } else {
                return { success: false, msg: "Could not reset likes" };
            }
        } catch (e) {
            console.error(e);
            return { success: false, msg: "Error resetting likes", err: e };
        } finally {
            await client.close();
        }

    };

    return postsDB;
}

export default postsDB();
