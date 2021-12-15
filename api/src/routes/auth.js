const router = require('express').Router();
const authModel = require('../models/auth');

router.post('/login', (req, res) => {
    authModel.login(req.body.email, req.body.password)
    .then(result => {
        res.json({ status: 'success', data: result });
    })
    .catch(err => {
        res.status(500).json({ status: 'failed', message: err });
    });
});

router.post('/register', (req, res) => {
    console.log(req.body);
    authModel.register(req.body.email, req.body.password)
    .then(result => {
        res.json({ status: 'success', data: result });
    })
    .catch(err => {
        res.status(500).json({ status: 'failed', message: err });
    });
});

module.exports = router;
