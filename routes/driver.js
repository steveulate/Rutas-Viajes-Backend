var express = require('express');
var router = express.Router();
const DriverController = require('../controllers/driver');
var HttpStatus = require('http-status-codes');


router.post('/', (req, res) => {
    DriverController.addDriver(req.body)
        .then(result => {
            if (result.output.success){
                res.sendStatus(201);
            }
            else
                res.status(400).json({ error: 'Error al agregar el chofer' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


router.get('/', (req, res) => {
    DriverController.getDrivers(req.query)
        .then(result => {
            if (result.recordset != null){
                res.status(200).json({ drivers: result.recordset });
            }
            else
                res.status(400).json({ error: 'No se pudieron obtener los choferes' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


router.put('/', (req, res) => {
    DriverController.updateDriver(req.body)
        .then(result => {
            if (result.output.success){
                res.sendStatus(204);
            }
            else
                res.status(400).json({ error: 'El chofer no existe o no se pudo modificar' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


module.exports = router;