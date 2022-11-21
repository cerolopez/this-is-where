import express from 'express';
import postsDB from '../db/postsDB.js';
let router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/newPost', async (req, res) => {
  console.log("I'm in the /newPost route");
  const postInfo = req.body;
  // TODO: get username through session
  const username = "eloniusmusk";
  let newPost = await postsDB.createPost(postInfo, username);
  res.json(newPost);

  // if (newPost) {
  //   return res.json({postCreated: true, err: null});
  // } else {
  //   res.json({postCreated: false, err: 'error creating new post'});
  // }
})

router.get('/getPosts', async (req, res) => {
  console.log("I'm in the /getPosts route");
  const listOfPosts = await postsDB.getPosts();
  res.json(listOfPosts);
})

// URL will have postID in URL as query
router.get('/getPost', async (req, res) => {
  console.log("I'm in /findPost")
  const postID = req.query.id;
  console.log("postID: ", postID);
  const foundPost = await postsDB.getPost(postID);

  if (foundPost) {
    return res.json(foundPost);
  } else {
    res.json({postFound: false, err: 'post not found'});
  }
})

router.post('/editPost', async (req, res) => {
  const postID = req.query.id;
  const postEdits = req.body;
  const editedPost = await postsDB.editPost(postID, postEdits);

  if (editedPost) {
    return res.json({postEdited: true, err: null});
  } else {
    return res.json({postEdited: false, err: 'error editing post'});
  }
})

router.get('/deletePost', async (req, res) => {
  const postID = req.query.id;
  const isDeleted = await postsDB.deletePost(postID);

  if (isDeleted) {
    return res.json({postDeleted: true, err: null});
  } else {
    return res.json({postDeleted: false, err: 'error deleting post'});
  }
})

router.post('/flagPost', async (req, res) => {
  const postID = req.query.id;
  const isFlagged = await postsDB.flagPost(postID);

  if (isFlagged) {
    return res.json({postFlagged: true, err: null});
  } else {
    return res.json({postFlagged: false, err: 'error flagging post'});
  }
})

router.post('/likePost', async (req, res) => {
  const postID = req.query.id;
  const isLiked = await postsDB.likePost(postID);

  if (isLiked) {
    return res.json({postLiked: true, err: null});
  } else {
    return res.json({postLiked: false, err: 'error liking post'});
  }
})

router.post('/unlikePost', async (req, res) => {
  const postID = req.query.id;
  const isUnliked = await postsDB.unlikePost(postID);

  if (isUnliked) {
    return res.json({postUnliked: true, err: null});
  } else {
    return res.json({postUnliked: false, err: 'error unliking post'});
  }
})


export default router;