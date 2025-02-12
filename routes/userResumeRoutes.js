const express = require('express');
const {
  postResume,
  postResumeSearch
} = require("../controllers/userResumeController");
const router = express.Router();

router.route('/resume').post(postResume);
router.route('/resume/search').post(postResumeSearch);

module.exports = router;