var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

exports.addStop = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('idRuta', sql.Int, req.idRuta)
            .input('LAT', sql.Float, req.LAT)
            .input('LNG', sql.Float, req.LNG)
            .output('success', sql.Bit, 0)
            .execute('addStop');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.getStops = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, !req.id ? null : req.id)
            .execute('getStops');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}


exports.updateStop = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, req.id)
            .input('idRuta', sql.Int, !req.idRuta ? null : req.idRuta)
            .input('LAT', sql.Float, !req.LAT ? null : req.LAT)
            .input('LNG', sql.Float, !req.LNG ? null : req.LNG)
            .output('success', sql.Bit, 0)
            .execute('updateStop');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.deleteStop = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, req.id)
            .output('success', sql.Bit, 0)
            .execute('deleteStop');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}