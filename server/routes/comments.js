var express = require('express');
var router = express.Router();

const comments = {
  123: {
    content: 'Test Comment',
    id: 123,
    post_id: 123,
    user_id: 1
  },
  345: {
    content: 'This post was awesome!',
    id: 345,
    post_id: 123,
    user_id: 1
  },
  456: {
    content: 'Test Comment 2',
    id: 456,
    post_id: 456,
    user_id: 1
  }
};

/* GET posts listing. */
router.get('/', function (req, res, next) {
  res.json(Object.values(comments));
});

router.get('/:id', function (req, res, next) {
  //res.send('respond with a resource');
  res.json(comments[req.params.id]);
});

module.exports = router;