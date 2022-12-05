import * as mongodb from "mongodb";

function UsersDB() {
  const usersDB = {};
  const Users = "Users";
  const Posts = "Posts";
  const DB_NAME = "ThisIsWhereDatabase";

  /**
   * Adds a User object to the Users collection in the database.
   * @param {object} userObj - expects an object with all User fields/values except _id.
   * @returns {object} { success: boolean, msg: string with details about success, userId: User's _id or null if operation failed}
   * */
  usersDB.addUserToDb = async function (userObj) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).insertOne(
        userObj
      );
      if (dbResponse.acknowledged) {
        const userId = dbResponse.insertedId.toString();
        return {
          success: true,
          msg: "Successfully added User to database.",
          userId: userId,
        };
      } else {
        return {
          success: false,
          msg: "Could not add User to database.",
          userId: null,
        };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error adding User to database.", err: e }; // Convention from previous project
    } finally {
      await client.close();
    }
  };

  /**
   * Removes a User from the Users collection in the database.
   * @param {userId} - expects the ID of the User to be removed.
   * @returns {object} {success: boolean, msg: string with details about success}
   * */
  usersDB.deleteUserFromDb = async function (userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).deleteOne({
        _id: userIdObj,
      });
      if (dbResponse.acknowledged) {
        return {
          success: true,
          msg: "Successfully removed User from database.",
        };
      } else {
        return { success: false, msg: "Could not remove User from database." };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error deleting User from database.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };

  usersDB.getUserById = async function (userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).findOne({
        _id: userIdObj,
      });
      if (dbResponse) {
        return {
          success: true,
          msg: "Successfully retrieved User from database.",
          user: dbResponse,
        };
      } else {
        return {
          success: false,
          msg: "Could not retrieve User from database.",
          user: null,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error retrieving User from database.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };


  usersDB.getUserByUsername = async function (userName) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).findOne({
        username: userName,
      });
      if (dbResponse) {
        return {
          success: true,
          msg: "Successfully retrieved User from database.",
          user: dbResponse,
        };
      } else {
        return {
          success: false,
          msg: "Could not retrieve User from database.",
          user: null,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error retrieving User from database.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };



  usersDB.getUserEmail = async function (userName) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).find({
        username: userName,
      }).project({email:1});
      if (dbResponse) {
        return {
          success: true,
          msg: "Successfully retrieved User's email from database.",
          user: dbResponse,
        };
      } else {
        return {
          success: false,
          msg: "Could not retrieve User's email from database.",
          user: null,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error retrieving User's email from database.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };

  usersDB.getUserByEmail = async function (email) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).findOne({
        email: email,
      });
      if (dbResponse) {
        return {
          success: true,
          msg: "Successfully retrieved User from database.",
          user: dbResponse,
        };
      } else {
        return {
          success: false,
          msg: "Could not retrieve User from database.",
          user: null,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error retrieving User from database.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };

  usersDB.getLikes = async function (userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).find({_id: userIdObj}).project({liked_posts:1}).toArray();
      return dbResponse;

    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }


  };


  usersDB.getFavorites = async function (userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).find({_id: userIdObj}).project({favorited_posts:1}).toArray();
      return dbResponse;

    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }


  };





  /**
   * Removes a post from a User's list of Posts.
   * @param {userId} - expects the ID of the User to remove a Post from
   * @param {postId} - expects the ID of the Post to be removed
   * @returns {object} - {success: boolean, msg: string with details about success}
   **/
  usersDB.removePostFromUser = async function (userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $pull: { posts: postId } }
      );
      if (dbResponse.acknowledged) {
        return {
          success: true,
          msg: "Successfully removed Post from User's posts.",
        };
      } else {
        return {
          success: false,
          msg: "Could not remove Post from User's posts.",
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error removing Post from User's posts.",
        err: e,
      };
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
  usersDB.addPostToUser = async function (userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $push: { posts: postId } }
      );
      if (dbResponse.acknowledged) {
        return {
          success: true,
          msg: "Successfully added Post to User's posts.",
        };
      } else {
        return { success: false, msg: "Could not add Post to User's posts." };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error adding Post to User's posts.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };

  usersDB.addPostToFavorites = async function (userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $push: { favorited_posts: postId } }
      );
      if (dbResponse.acknowledged) {
        return {
          success: true,
          msg: "Successfully added Post to User's favorited posts.",
        };
      } else {
        return {
          success: false,
          msg: "Could not add Post to User's favorited posts.",
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error adding Post to User's favorited Posts.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };

  usersDB.removePostFromFavorites = async function (userId, postId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $pull: { favorited_posts: postId } }
      );
      if (dbResponse.acknowledged) {
        return {
          success: true,
          msg: "Successfully removed Post from User's favorited posts.",
        };
      } else {
        return {
          success: false,
          msg: "Could not remove Post from User's favorited posts.",
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error removing Post from User's favorited Posts.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };

  usersDB.updateUsername = async function (userId, newUsername) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $set: { username: newUsername } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully updated username." };
      } else {
        return { success: false, msg: "Could not update username." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error updating username.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.updateEmail = async function (userId, newEmail) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $set: { email: newEmail } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully updated email." };
      } else {
        return { success: false, msg: "Could not update email." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error updating email.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.updateUserBio = async function (userId, newBio) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $set: { bio: newBio } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully updated bio" };
      } else {
        return { success: false, msg: "Could not update bio." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error updating bio.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.updateLocation = async function (userId, newLocation) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $set: { location: newLocation } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Succesfully updated location." };
      } else {
        return { success: false, msg: "Could not update location." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error updating location.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.changeProfileVisibility = async function (userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const user = await ThisIsWhereDb.collection(Users).findOne({
        _id: userIdObj,
      });
      if (user.profile_is_hidden) {
        const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
          { _id: userIdObj },
          { $set: { profile_is_hidden: false } }
        );
      } else {
        const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
          { _id: userIdObj },
          { $set: { profile_is_hidden: true } }
        );
      }
      if (dbResponse.acknowledged) {
        return {
          success: true,
          msg: "Successfully changed profile visibility.",
          err: null,
        };
      } else {
        return {
          success: false,
          msg: "Could not change profile visibility.",
          err: null,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error changing profile visibility.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };

  //TODO - move this to postsDB.
  usersDB.flagPost = async function (postId, userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const postIdObj = new mongodb.ObjectId(postId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Posts).updateOne(
        { _id: postIdObj },
        { $push: { flaggedBy: userId } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully flagged post." };
      } else {
        return { success: false, msg: "Could not flag post." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error flagging post.", err: e };
    } finally {
      await client.close();
    }
  };
  //TODO = move this to postsDB.
  usersDB.unflagPost = async function (postId, userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const postIdObj = new mongodb.ObjectId(postId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Posts).updateOne(
        { _id: postIdObj },
        { $pull: { flaggedBy: userId } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully unflagged post." };
      } else {
        return { success: false, msg: "Could not unflag post." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error unflagging post.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.likePost = async function (postId, userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $push: { liked_posts: postId } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully liked post." };
      } else {
        return { success: false, msg: "Could not like post." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error liking post.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.unlikePost = async function (postId, userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $pull: { liked_posts: postId } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully unliked post." };
      } else {
        return { success: false, msg: "Could not unlike post." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error unliking post.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.favoritePost = async function (postId, userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $push: { favorited_posts: postId } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully favorited post." };
      } else {
        return { success: false, msg: "Could not favorite post." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error favoriting post.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.unfavoritePost = async function (postId, userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).updateOne(
        { _id: userIdObj },
        { $pull: { favorited_posts: postId } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, msg: "Successfully unfavorited post." };
      } else {
        return { success: false, msg: "Could not unfavorite post." };
      }
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error unfavoriting post.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.isLiked = async function (postId, userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).findOne({
        _id: userIdObj,
      });
      if (!dbResponse) {
        return {
          success: false,
          msg: "Could not retrieve User from database.",
        };
      }
      const likedPosts = dbResponse.liked_posts;
      // console.log("User: ", userId);
      // console.log("User's likedPosts: ", likedPosts);
      // console.log("Post being checked: ", postId);
      const postIsLiked = likedPosts.includes(postId);
      // console.log("Does user like post? ", postIsLiked);

      return postIsLiked;
    } catch (e) {
      console.error(e);
      return { success: false, msg: "Error getting post Like info.", err: e };
    } finally {
      await client.close();
    }
  };

  usersDB.isFavorited = async function (postId, userId) {
    const uri = process.env.DB_URI || "mongodb://localhost:27017";
    const client = new mongodb.MongoClient(uri);
    const userIdObj = new mongodb.ObjectId(userId);

    try {
      await client.connect();
      const ThisIsWhereDb = await client.db(DB_NAME);
      const dbResponse = await ThisIsWhereDb.collection(Users).findOne({
        _id: userIdObj,
      });
      if (!dbResponse) {
        return {
          success: false,
          msg: "Could not retrieve User from database.",
        };
      }
      const favoritedPosts = dbResponse.favorited_posts;
      const postIsFavorited = favoritedPosts.includes(postId);
      return {
        success: true,
        msg: "Successfully retrieved Post favorite info.",
        isFavorited: postIsFavorited,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: "Error getting post Favorite info.",
        err: e,
      };
    } finally {
      await client.close();
    }
  };

  return usersDB;
}

export default UsersDB();
