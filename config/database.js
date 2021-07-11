const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({

    connectionLimit:10,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bf3b519baa317b',
    password: '11f13633',
    database: 'heroku_3b2f6ab67422902'
})

pool.query = util.promisify(pool.query)


module.exports = pool

