var express = require('express');
var router = express.Router();
const EventController = require('../controllers/event');
var HttpStatus = require('http-status-codes');

router.post('/', (req, res) => {
    EventController.addEvent(req.body)
        .then(result => {
            if (result.output.success){
                res.sendStatus(200);
            }
            else
                res.status(400).json({ error: 'Couldnt add an event' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});

router.get('/:id', (req, res) => {
    EventController.getEventsByTravel(req.params)
        .then(result => {
            if (result.recordset != null){
                res.status(200).json({ events: result.recordset });
            }
            else
                res.status(400).json({ error: 'No se pudieron obtener los eventos' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});
module.exports = router;