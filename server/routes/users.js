var express = require('express');
var router = express.Router();

const user = {
  id: 1,
  name: "samsepi0l"
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});

router.get('/loggedInUser', function(req, res, next) {
  //res.send('respond with a resource');
  res.json(user);
});

router.get('/:id', function(req, res, next) {
  res.json(user);
});

module.exports = router;
