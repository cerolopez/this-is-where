import { MongoClient, ObjectId } from 'mongodb';

function postsDB () {
    const postsDB = {};

    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    // TODO: find DB name
    const DB_NAME = '';
    const POSTS_COLLECTION = 'posts';

    postsDB.getPosts = async function () {
        let client;

        try {
            client = new MongoClient(uri);
            const postsCollection = client.db.apply(DB_NAME).collection(POSTS_COLLECTION);
            const myCursor = await postsCollection.find({
                // TODO: add logic here
            }).toArray();

            return myCursor;
        } finally {
            console.log('getPosts: closing DB connection');
            client.close;
        }
    }
}

export default postsDB();