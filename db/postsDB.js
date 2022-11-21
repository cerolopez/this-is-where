import { MongoClient, ObjectId } from 'mongodb';

function postsDB () {
    const postsDB = {};
    const DB_NAME = 'ThisIsWhereDatabase';
    const POSTS_COLLECTION = 'Posts';

    postsDB.createPost = async function (postInfo = {}, user) {
        const uri = process.env.DB_URI || 'mongodb://localhost:27017';
        console.log("I'm in the postsDB function")
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCollection = client.db(DB_NAME).collection(POSTS_COLLECTION);
            const newPost = {
                city: postInfo.city,
                location: postInfo.location,
                body: postInfo.msg,
                date: postInfo.timestamp,
                type: postInfo.type,
                username: user,
                isHidden: false,
                isFlagged: false,
                likeCount: 0
            }
            console.log("Attempting to create a new post");
            const res = await postsCollection.insertOne(newPost);
            console.log("Inserted: ", res);
            return res;
        } finally {
            console.log('createPosts: closing DB connection');
            client.close();
        }
    }

    postsDB.getPosts = async function () {
        const uri = process.env.DB_URI || 'mongodb://localhost:27017';
        console.log("I'm in the getPosts function")
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCollection = client.db(DB_NAME).collection(POSTS_COLLECTION);
            console.log("Attempting to get all posts");
            const res = await postsCollection.find().toArray();
            console.log("Found: ", res);
            return res;
        } finally {
            console.log('getPosts: closing DB connection');
            client.close();
        }
    }

    // executes when a user clicks on a post card
    postsDB.getPost = async function (postID = {}) {
        const uri = process.env.DB_URI || 'mongodb://localhost:27017';
        console.log("I'm in the getPost db function")
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const postsCollection = client.db(DB_NAME).collection(POSTS_COLLECTION);
            const res = await postsCollection.find({
                _id: ObjectId(`${postID}`)
            }).toArray();

            console.log('found post: ', res);

            return res;
        } finally {
            console.log('getPost: closing DB connection');
            client.close();
        }
    }

    postsDB.editPost = async function (postID = {}, postEdits) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            await postsCollection.updateOne({
                _id: ObjectId(`${postID}`)
            }, {
                city: postEdits.city,
                location: postEdits.location,
                body: postEdits.body,
                date: postEdits.date,
                type: postEdits.type,
                isHidden: postEdits.isHidden
            });

            console.log('edited post');

            return true;
        } finally {
            console.log('editPost: closing DB connection');
            client.close();
        }
    }

    postsDB.deletePost = async function (postID = {}) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            await postsCollection.deleteOne({
                _id: ObjectId(`${postID}`)
            });

            console.log('post successfully deleted: ', postID);
            return true;
        } finally {
            console.log('deletePost: closing DB connection');
            client.close();
        }
    }

    postsDB.flagPost = async function (postID = {}) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateOne({
                _id: ObjectId(`${postID}`)
            }, {
                isFlagged: true
            });

            console.log('post successfully flagged: ', res);
            return true;
        } finally {
            console.log('flagPost: closing DB connection');
            client.close();
        }
    }

    postsDB.likePost = async function (postID = {}) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateOne({
                _id: ObjectId(`${postID}`)
            }, {
                $inc: { likeCount: 1 }
            });

            console.log('post successfully liked: ', res);
            return true;
        } finally {
            console.log('likePost: closing DB connection');
            client.close();
        }
    }

    postsDB.unlikePost = async function (postID = {}) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateOne({
                _id: ObjectId(`${postID}`)
            }, {
                $inc: { likeCount: -1 }
            });

            console.log('post successfully unliked: ', res);
            return true;
        } finally {
            console.log('unlikePost: closing DB connection');
            client.close();
        }
    }

    return postsDB;
}

export default postsDB();