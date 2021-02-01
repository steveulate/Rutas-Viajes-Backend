var express = require('express');
var router = express.Router();
const VehicleController = require('../controllers/vehicle');
var HttpStatus = require('http-status-codes');


router.post('/', (req, res) => {
    VehicleController.addVehicle(req.body)
        .then(result => { 
            if (result.output.success){
                res.sendStatus(201);
            }
            else
                res.status(400).json({ error: 'Error al agregar el vehiculo' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


router.get('/', (req, res) => {
    VehicleController.getVehicles(req.query)
        .then(result => {
            if (result.recordset != null){
                res.status(200).json({ vehicles: result.recordset });
            }
            else
                res.status(400).json({ error: 'No se pudieron obtener los vehiculos' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


module.exports = router;