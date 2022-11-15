import express from 'express';
let router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/newPost', async (req, res) => {
  const postInfo = req.body;
  const newPost = await postsDB.getPosts(postInfo);

  if (newPost) {
    return res.json({postCreated: true, err: null});
  } else {
    res.json({postCreated: false, err: 'error creating new post'});
  }
})

export default router;