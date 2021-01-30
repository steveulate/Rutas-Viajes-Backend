var express = require('express');
var router = express.Router();
const RouteController = require('../controllers/route');
var HttpStatus = require('http-status-codes');


router.post('/', (req, res) => {
    RouteController.addRoute(req.body)
        .then(result => { 
            if (result.output.success){
                res.status(200).json({route: result.recordset});
            }
            else
                res.status(400).json({ error: 'Error al agregar la Ruta' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


router.get('/', (req, res) => {
    RouteController.getRoutes(req.query)
        .then(result => {
            if (result.recordset != null){
                res.status(200).json({ routes: result.recordset });
            }
            else
                res.status(400).json({ error: 'No se pudieron obtener las rutas' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


router.put('/', (req, res) => {
    RouteController.updateRoute(req.body)
        .then(result => {
            if (result.output.success){
                res.sendStatus(204);
            }
            else
                res.status(400).json({ error: 'La ruta no existe o no se pudo modificar' });
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});


module.exports = router;