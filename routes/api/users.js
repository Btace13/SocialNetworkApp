const express = require('express');
const router = express.Router();

//@Route:           /api/user/test
//@Description:   Test
//@Access:          Public
router.get('/test', (req, res) => res.json({msg: 'user works'}) );

module.exports = router;