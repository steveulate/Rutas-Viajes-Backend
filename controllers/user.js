var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;


exports.login = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input("correo", sql.VarChar(100), req.correo)
            .input("contraseña", sql.VarChar(30), req.contraseña)
            .output('success', sql.Bit, 0)
            .execute('log_In');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}
