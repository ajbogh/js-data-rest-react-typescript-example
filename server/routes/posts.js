var express = require('express');
var router = express.Router();

const posts = {
  123: {
    content: 'Hello',
    createdAt: new Date(2016, 11, 31),
    date_published: new Date(2016, 11, 31),
    id: 123,
    title: 'Test Post 1',
    user_id: 1
  },
  456: {
    content: 'World',
    createdAt: new Date(2018, 02, 12),
    date_published: new Date(2018, 02, 12),
    id: 456,
    title: 'Test Post 2',
    user_id: 1
  }
};

/* GET posts listing. */
router.get('/', function (req, res, next) {
  res.json(Object.values(posts));
});

router.get('/:id', function (req, res, next) {
  //res.send('respond with a resource');
  res.json(posts[req.params.id]);
});

module.exports = router;