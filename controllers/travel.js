var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

exports.addTravel = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('idRuta', sql.Int, req.idRuta)
            .output('success', sql.Bit, 0)
            .execute('addTravel');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

//Manda id de la ruta y devuelve los viajes relacionados con esa ruta
exports.getTravels = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, !req.id ? null : req.id)
            .execute('getTravels');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.getTravel = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, !req.id ? null : req.id)
            .execute('getTravel');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}