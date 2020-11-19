const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const FEEDS_URL_BASE = 'posts';

// GET /feed/posts
router.get(`/${FEEDS_URL_BASE}`, isAuth, feedController.getPosts);

// POST /feed/post
router.post(
  `/${FEEDS_URL_BASE}`, isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

router.get(`/${FEEDS_URL_BASE}/:postId`, isAuth, feedController.getPost);

router.put(
  `/${FEEDS_URL_BASE}:postId`, isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);

router.delete(`/${FEEDS_URL_BASE}/:postId`, isAuth, feedController.deletePost);

module.exports = router;
