var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');
var HttpStatus = require('http-status-codes');

router.post('/', (req, res) => {
    UserController.login(req.body)
        .then(result => {
            if (result.output.success){
                res.status(200).json({ user: result.recordset[0]});
            }
            else
                res.status(400).json({ error: 'Couldnt login' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});

router.get('/:id', (req, res) => {
    TravelController.getTravel(req.params)
        .then(result => {
            if (result.recordset != null){
                res.status(200).json({ users: result.recordset });
            }
            else
                res.status(400).json({ error: 'No se pudieron obtener los usuarios' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});
module.exports = router;