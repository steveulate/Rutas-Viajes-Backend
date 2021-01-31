var express = require('express');
var router = express.Router();
const TravelController = require('../controllers/travel');
var HttpStatus = require('http-status-codes');


router.post('/', (req, res) => {
    TravelController.addTravel(req.body)
        .then(result => { 
            if (result.output.success){
                res.status(200).json(result.recordset[0]);
            }
            else
                res.status(400).json({ error: 'Error al agregar el viaje' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


router.get('/', (req, res) => {
    TravelController.getTravels(req.query)
        .then(result => {
            if (result.recordset != null){
                res.status(200).json({ travels: result.recordset });
            }
            else
                res.status(400).json({ error: 'No se pudieron obtener los viajes' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


module.exports = router;