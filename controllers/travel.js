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
        console.log(result);
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.updateTravel = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, req.id)
            .input('idRuta', sql.Int, !req.idRuta ? null : req.idRuta)
            .input('isActive', sql.Bit, !req.isActive ? null : req.isActive)
            .input('fecha', sql.DateTime, !req.fecha ? null : req.fecha)
            .output('success', sql.Bit, 0)
            .execute('updateTravel');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.updateUserTravel = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('idUsuario', sql.Int, req.idUsuario)
            .input('isActive', sql.Bit, req.isActive)
            .input('idViaje', sql.DateTime, req.idViaje)
            .output('success', sql.Bit, 0)
            .execute('updateUserTravel');
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