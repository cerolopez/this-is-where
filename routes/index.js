import express from 'express';
let router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/create-post', (req, res, next) => {
  // call db

  postsDB.getPosts(postInfo);
})

export default router;