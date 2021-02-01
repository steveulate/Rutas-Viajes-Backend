var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

exports.addVehicle = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('placa', sql.VarChar(15), req.placa)
            .input('marca', sql.VarChar(30), req.marca)
            .input('modelo', sql.Int, req.modelo)
            .input('año', sql.Int, req.año)
            .input('infGrafica', sql.VarChar(30), req.infGrafica)
            .input('capacidad', sql.Int, req.capacidad)
            .input('idChofer', sql.Int, req.idChofer)
            .output('success', sql.Bit, 0)
            .execute('addVehicle');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.getVehicles = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('filter', sql.VarChar(15), !req.placa ? null : req.placa)
            .execute('getVehicles');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}
