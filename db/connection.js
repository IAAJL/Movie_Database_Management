let mariadb = require('mariadb')

let pool = mariadb.createPool({
    host: 'localhost', 
    user:'root', 
    password: 'root',
    connectionLimit: 5,
    database:'movie',
});

function getPool(){
    return pool;
}

module.exports = {getPool}