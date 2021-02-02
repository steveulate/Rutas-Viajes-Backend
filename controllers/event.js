var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

exports.addEvent = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('nombre', sql.VarChar(30), req.nombre)
            .input('descripcion', sql.Int, req.descripcion)
            .input('idViaje', sql.Bit, req.idViaje)
            .input('cambiarRuta', sql.Bit, req.cambiarRuta)
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

