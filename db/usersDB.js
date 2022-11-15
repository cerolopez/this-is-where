import * as mongodb from "mongodb";

function UserConnect() {
  const userConnect = {};
  const Users = "Users";

  /**
   * Adds a User object to the Users collection in the database.
   * @param {object} userObj - expects an object with all User fields/values except _id.
   * @returns {object} { success: boolean, msg: string with details about success, userId: User's _id or null if operation failed}
   * */
  userConnect.addUserToDb = async function(userObj) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db("ThisIsWhereDatabase");
      const dbResponse = await ThisIsWhereDb.collection(Users).insertOne(userObj);
      if (dbResponse.acknowledged) {
        const userId = dbResponse.insertedId.toString();
        return { success: true, msg: "Successfully added User to database.", userId: userId};
      } else {
        return {success: false, msg: "Could not add User to database.", userId: null};
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error adding User to database.", err: e}; // Convention from previous project
    } finally {
      await client.close();
    }
  };

  /**
   * Removes a User from the Users collection in the database.
   * @param {userId} - expects the ID of the User to be removed.
   * @returns {object} {success: boolean, msg: string with details about success}
   * */
  userConnect.deleteUserFromDb = async function(userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db("ThisIsWhereDatabase");
      const dbResponse = await ThisIsWhereDb.collection(Users).deleteOne({_id: userIdObj});
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Successfully removed User from database."};
      } else {
        return {success: false, msg: "Could not remove User from database."};
      }

    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error deleting User from database.", err: e};
    } finally {
      await client.close();
    }
  };

  userConnect.getUserById = async function(userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db("ThisIsWhereDatabase");
      const dbResponse = await ThisIsWhereDb.collection(Users).findOne({_id: userIdObj});
      if (dbResponse) {
        return {success: true, msg: "Successfully retrieved User from database.", user: dbResponse};
      } else {
        return {success: false, msg: "Could not retrieve User from database.", user: null};
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error retrieving User from database.", err: e};
    } finally {
      await client.close();
    }

  };

  userConnect.getUserByUsername = async function(userName) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db("ThisIsWhereDatabase");
      const dbResponse = await ThisIsWhereDb.collection(Users).findOne({username: userName});
      if (dbResponse) {
        return {success: true, msg: "Successfully retrieved User from database.", user: dbResponse};
      } else {
        return {success: false, msg: "Could not retrieve User from database.", user: null};
      }
    } catch (e) {
      console.error(e);
      return {success: false, msg: "Error retrieving User from database.", err: e};
    } finally {
      await client.close();
    }
  };




  //NOTE: I could consolidate add/remove post into one function that takes a string ("add" or "remove") as a parameter

  /**
   * Removes a post from a User's list of Posts.
   * @param {userId} - expects the ID of the User to remove a Post from
   * @param {postId} - expects the ID of the Post to be removed
   * @returns {object} - {success: boolean, msg: string with details about success}
   **/
  userConnect.removePostFromUser = async function(userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db("ThisIsWhereDatabase");
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne({ _id: userIdObj }, {$pull: {posts: postId}});
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Successfully removed Post from User's posts."};
      } else {
        return {success: false, msg: "Could not remove Post from User's posts."};
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error removing Post from User's posts.", err: e};
    } finally {
      await client.close();
    }
  };

  /**
   * Adds a Post to a User's list of Posts.
   * @param {userId} - expects the ID of the User to add a Post to
   * @param {postId} - expects the ID of the Post to add
   * @returns {object} - {success: boolean, msg: string with details about success}
   * 
   * */
  userConnect.addPostToUser = async function(userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db("ThisIsWhereDatabase");
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne({_id: userIdObj}, {$push: {posts: postId}});
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Successfully added Post to User's posts."};
      } else {
        return {success: false, msg: "Could not add Post to User's posts."};
      }

    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error adding Post to User's posts.", err: e};
    } finally {
      await client.close();
    }


  };

  return userConnect;
}

export default UserConnect();