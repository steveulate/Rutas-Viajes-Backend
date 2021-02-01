var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

exports.addRoute = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('nombre', sql.VarChar(45), req.nombre)
            .input('puntoOrigenLAT', sql.Float, req.puntoOrigenLAT)
            .input('puntoOrigenLNG', sql.Float, req.puntoOrigenLNG)
            .input('puntoDestinoLAT', sql.Float, req.puntoDestinoLAT)
            .input('puntoDestinoLNG', sql.Float, req.puntoDestinoLNG)
            .input('horarioSalida', sql.DateTime, req.horarioSalida)
            .input('tiempoLlegada', sql.Int, req.tiempoLlegada)
            .input('precioRuta', sql.Float, req.precioRuta)
            .input('kilometraje', sql.Float, req.kilometraje)
            .input('idAuto', sql.Int, req.idAuto)
            .output('success', sql.Bit, 0)
            .execute('addRoute');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.getRoutes = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, !req.id ? 0 : req.id)
            .execute('getRoutes');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}


exports.updateRoute = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, req.id)
            .input('nombre', sql.VarChar(45), !req.nombre ? null : req.nombre)
            .input('puntoOrigenLAT', sql.Float, !req.puntoOrigenLAT ? null : req.puntoOrigenLAT)
            .input('puntoOrigenLNG', sql.Float, !req.puntoOrigenLNG ? null : req.puntoOrigenLNG)
            .input('puntoDestinoLAT', sql.Float, req.puntoDestinoLAT)
            .input('puntoDestinoLNG', sql.Float, req.puntoDestinoLNG)
            .input('horarioSalida', sql.DateTime, req.horarioSalida)
            .input('tiempoLlegada', sql.Time, req.tiempoLlegada)
            .input('precioRuta', sql.Float, req.precioRuta)
            .input('kilometraje', sql.Int, req.kilometraje)
            .input('idAuto', sql.Int, req.idAuto)
            .input('isActive', sql.Bit, req.isActive)
            .output('success', sql.Bit, 0)
            .execute('updateRoute');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}
