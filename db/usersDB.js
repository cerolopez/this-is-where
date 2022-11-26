import * as mongodb from "mongodb";

function UsersDB() {
  const usersDB = {};
  const Users = "Users";
  const DB_NAME = "ThisIsWhereDatabase";

  /**
   * Adds a User object to the Users collection in the database.
   * @param {object} userObj - expects an object with all User fields/values except _id.
   * @returns {object} { success: boolean, msg: string with details about success, userId: User's _id or null if operation failed}
   * */
  usersDB.addUserToDb = async function(userObj) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
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
  usersDB.deleteUserFromDb = async function(userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
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

  usersDB.getUserById = async function(userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
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

   usersDB.getUserByUsername = async function(userName) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
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
  }

  usersDB.getUserByEmail = async function(email) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).findOne({email: email});
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
  }

  //NOTE: I could consolidate add/remove post into one function that takes a string ("add" or "remove") as a parameter

  /**
   * Removes a post from a User's list of Posts.
   * @param {userId} - expects the ID of the User to remove a Post from
   * @param {postId} - expects the ID of the Post to be removed
   * @returns {object} - {success: boolean, msg: string with details about success}
   **/
  usersDB.removePostFromUser = async function(userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
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
  usersDB.addPostToUser = async function(userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users)
        .updateOne({_id: userIdObj}, {$push: {posts: postId}});
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

  usersDB.addPostToFavorites = async function(userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users)
        .updateOne({_id: userIdObj}, {$push: {favorited_posts: postId}});
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Successfully added Post to User's favorited posts."};
      } else {
        return {success: false, msg: "Could not add Post to User's favorited posts."};
      }
    } catch (e) {
      console.error(e);
      return {success: false, msg: "Error adding Post to User's favorited Posts.", err: e};
    } finally {
      await client.close();
    }
  };

  usersDB.updateUsername = async function(userId, newUsername) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne({_id: userIdObj}, { $set: { username: newUsername } });
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Successfully updated username."};
      }
      else {
        return {success: false, msg: "Could not update username."};
      }
    } catch (e) {
      console.error(e);
      return {success: false, msg: "Error updating username.", err: e};
    } finally {
      await client.close();
    }
  };

  usersDB.updateEmail = async function(userId, newEmail) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne({_id: userIdObj}, { $set: { email: newEmail } });
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Successfully updated email."};
      } else {
        return {success: false, msg: "Could not update email."};
      }
    } catch (e) {
      console.error(e);
      return {success: false, msg: "Error updating email.", err: e};
    } finally {
      await client.close();
    }
  };

  usersDB.updateUserBio = async function(userId, newBio) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne({_id: userIdObj}, { $set: {bio: newBio} });
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Successfully updated bio"};
      } else {
        return {success: false, msg: "Could not update bio."};
      }
    } catch (e) {
      console.error(e);
      return {success: false, msg: "Error updating bio.", err: e};

    } finally {
      await client.close();
    }
  };

  usersDB.updateLocation = async function(userId, newLocation) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne({_id: userIdObj}, { $set: {location: newLocation} });
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Succesfully updated location."};
      } else {
        return {success: false, msg: "Could not update location."};
      }
    } catch (e) {
      console.error(e);
      return {success: false, msg: "Error updating location.", err: e};
    } finally {
      await client.close();
    }
  };

  usersDB.changeProfileVisibility = async function(userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const user = await ThisIsWhereDb.collection(Users).findOne({_id: userIdObj});
      if (user.profile_is_hidden) {
        const dbResponse = await ThisIsWhereDb
          .collection(Users).updateOne({_id: userIdObj}, { $set: {profile_is_hidden: false} });
      } else {
        const dbResponse = await ThisIsWhereDb
          .collection(Users).updateOne({_id: userIdObj}, { $set: {profile_is_hidden: true} });
      }
      if (dbResponse.acknowledged) {
        return {success: true, msg: "Successfully changed profile visibility.", err: null};
      } else {
        return {success: false, msg: "Could not change profile visibility.", err: null};
      }
    } catch (e) {
      console.error(e);
      return {success: false, msg: "Error changing profile visibility.", err: e};
    } finally {
      await client.close();
    }
  };






  return usersDB;
}


export default UsersDB();