// import express from 'express';
// import postsDB from '../db/postsDB.js';
// import usersDB from "../db/usersDB.js";
// let router = express.Router();


// router.post('/newPost', async (req, res) => {
//   console.log("I'm in the /newPost route");
//   const postInfo = req.body;
//   const username = req.session.passport.user.username;
//   const userId = req.session.passport.user.id;
//   //TODO - return Post from postsDB.createPost
//   let newPost = await postsDB.createPost(postInfo, username);
//   const postID = newPost._id.toString();
//   const dbResponse = await usersDB.addPostToUser(userId, postID);
//   if (dbResponse.success) {
//     res.json({success: true, msg: "Successfully created new post.", post: newPost});
//   }
// })

// router.get('/getPosts', async (req, res) => {
//   console.log("I'm in the /getPosts route");
//   const listOfPosts = await postsDB.getPosts();
//   res.json(listOfPosts);
// })

// // URL will have postID in URL as query
// router.get('/getPost', async (req, res) => {
//   console.log("I'm in /getPost")
//   const postID = req.query.id;
//   console.log("postID: ", postID);
//   const foundPost = await postsDB.getPost(postID);

//   if (foundPost) {
//     return res.json(foundPost);
//   } else {
//     res.json({postFound: false, err: 'post not found'});
//   }
// })

// router.post('/editPost', async (req, res) => {
//   const postID = req.query.id;
//   const postEdits = req.body;
//   const editedPost = await postsDB.editPost(postID, postEdits);

//   if (editedPost) {
//     return res.json({postEdited: true, err: null});
//   } else {
//     return res.json({postEdited: false, err: 'error editing post'});
//   }
// })

// router.get('/deletePost', async (req, res) => {
//   const postID = req.query.id;
//   const isDeleted = await postsDB.deletePost(postID);

//   if (isDeleted) {
//     return res.json({postDeleted: true, err: null});
//   } else {
//     return res.json({postDeleted: false, err: 'error deleting post'});
//   }
// })

// router.post('/flagPost', async (req, res) => {
//   const postID = req.query.id;
//   const isFlagged = await postsDB.flagPost(postID);

//   if (isFlagged) {
//     return res.json({postFlagged: true, err: null});
//   } else {
//     return res.json({postFlagged: false, err: 'error flagging post'});
//   }
// })

// router.post('/likePost', async (req, res) => {
//   const postID = req.query.id;
//   const likePost = await postsDB.likePost(postID);

//   if (likePost) {
//     return res.json({postLiked: true, err: null});
//   } else {
//     return res.json({postLiked: false, err: 'error liking post'});
//   }
// })

// router.post('/unlikePost', async (req, res) => {
//   const postID = req.query.id;
//   const isUnliked = await postsDB.unlikePost(postID);

//   if (isUnliked) {
//     return res.json({postUnliked: true, err: null});
//   } else {
//     return res.json({postUnliked: false, err: 'error unliking post'});
//   }
// })

// // this route checks if the current user has liked a post; returns boolean
// router.get('/checkIfLiked', async (req, res) => {

//   // TODO: check why sessions isn't working
//   // const userId = req.session.passport.user.id;
//   console.log("I'm in checkIfLiked");
//   // const postID = req.query.id;

//   // TODO: check why db call isn't working
//   // const isLiked = await usersDB.isLiked(postID, userId);
//   res.json(false);
// })

// // this route checks if the current user has favorited a post; returns boolean
// router.get('/checkIfFavorited', async (req, res) => {
//   // const userId = req.session.passport.user.id;
//   const postID = req.query.id;
//   // TODO: write DB function to get info
//   // const isFavorited = await usersDB.isFavorited(postID, userId);
//   res.json(true);
// })

// export default router;