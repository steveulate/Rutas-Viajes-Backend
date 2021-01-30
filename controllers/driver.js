var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

exports.addDriver = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('nombre', sql.VarChar(30), req.nombre)
            .input('edad', sql.Int, req.edad)
            .input('licencia', sql.Bit, req.licencia)
            .input('telefono', sql.VarChar(10), req.telefono)
            .input('correo', sql.VarChar(100), req.correo)
            .input('contrasena', sql.VarChar(30), req.contrasena)
            .input('isActive', sql.Bit, 1)
            .output('success', sql.Bit, 0)
            .execute('addDriver');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.getDrivers = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('filter', sql.VarChar(30), !req.filter ? null : req.filter)
            .execute('getDrivers');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}


exports.updateDriver = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, req.id)
            .input('nombre', sql.VarChar(30), !req.nombre ? null : req.nombre)
            .input('edad', sql.Int, !req.edad ? null : req.edad)
            .input('licencia', sql.Bit, req.licencia == undefined ? null : req.licencia)
            .input('telefono', sql.VarChar(9), !req.telefono ? null : req.telefono)
            .input('correo', sql.VarChar(50), !req.correo ? null : req.correo)
            .input('contrasena', sql.VarChar(30), !req.contrasena ? null : req.contrasena)
            .input('isActive', sql.Bit,  req.isActive == undefined ? null : req.isActive)
            .output('success', sql.Bit, 0)
            .execute('updateDriver');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}
