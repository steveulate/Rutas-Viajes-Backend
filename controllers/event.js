var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

exports.addEvent = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('cambiarRuta', sql.Bit, req.cambiarRuta)
            .input('descripcion', sql.VarChar(100), req.descripcion)
            .input('idViaje', sql.Int, req.idViaje)
            .input('nombre', sql.VarChar(50), req.nombre)
            .input('hora',sql.DateTime, req.hora)
            .output('success', sql.Bit, 0)
            .execute('addEvent');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.getEventsByTravel = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.VarChar(30), !req.id ? null : req.id)
            .execute('getEventsByTravel');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

