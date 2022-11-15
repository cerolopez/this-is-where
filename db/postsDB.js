import { MongoClient, ObjectId } from 'mongodb';

function postsDB () {
    const postsDB = {};

    const uri = process.env.DB_URI || 'mongodb://localhost:27017';
    // TODO: get DB name
    const DB_NAME = 'this-is-where-db';
    const POSTS_COLLECTION = 'posts';

    postsDB.createPost = async function (postInfo) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const newPost = {
                city: postInfo.city,
                location: postInfo.location,
                body: postInfo.body,
                date: postInfo.date,
                type: postInfo.type,
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
            client.close;
        }
    }

    postsDB.getPost = async function (postID = {}) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.find({
                _id: ObjectId(`${postID}`)
            }).toArray();

            console.log('found post: ', res);

            return res;
        } finally {
            console.log('getPost: closing DB connection');
            client.close;
        }
    }

    postsDB.editPost = async function (postID = {}) {
        let client;

        try {
            client = new MongoClient(uri);
            await client.connect();
            const db = client.db(DB_NAME);
            const postsCollection = db.collection(POSTS_COLLECTION);
            const res = await postsCollection.updateOne({
                _id: ObjectId(`${postID}`)
            }, {
                city: postInfo.city,
                location: postInfo.location,
                body: postInfo.body,
                date: postInfo.date,
                type: postInfo.type,
                isHidden: postInfo.isHidden
            });

            console.log('edited post: ', res);

            return res;
        } finally {
            console.log('editPost: closing DB connection');
            client.close;
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
            client.close;
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
            client.close;
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
            client.close;
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
            client.close;
        }
    }
}

export default postsDB();