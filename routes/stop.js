var express = require('express');
var router = express.Router();
const StopController = require('../controllers/stop');
var HttpStatus = require('http-status-codes');


router.post('/', (req, res) => {
    StopController.addStop(req.body)
        .then(result => { 
            if (result.output.success){
                res.sendStatus(204);
            }
            else
                res.status(400).json({ error: 'Error al agregar la parada' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


router.get('/', (req, res) => {
    StopController.getStops(req.query)
        .then(result => {
            if (result.recordset != null){
                res.status(200).json({ stops: result.recordset });
            }
            else
                res.status(400).json({ error: 'No se pudieron obtener las paradas' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


router.put('/', (req, res) => {
    StopController.updateStop(req.body)
        .then(result => {
            if (result.output.success){
                res.sendStatus(204);
            }
            else
                res.status(400).json({ error: 'La parada no existe o no se pudo modificar' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});

router.delete('/:id', (req, res) => {
    StopController.deleteStop(req.params)
        .then(result => {
            if (result.output.success){
                res.sendStatus(204);
            }
            else
                res.status(400).json({ error: 'La parada no existe o no se pudo modificar' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});

module.exports = router;