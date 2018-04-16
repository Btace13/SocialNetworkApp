const express = require('express');
const router = express.Router();


//@Route:           /api/post/test
//@Description:   Test
//@Access:          Public
router.get('/test', (req, res) => res.json({msg: 'Post works'}) );

module.exports = router;