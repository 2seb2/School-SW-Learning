var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 50,
    waitForConnections: true,
    host: 'localhost',
    port: '3306',
    database: 'react_test',
    user: 'react',
    password: '1234',
});

router.post('/', (req, res) => {
    const mybatisMapper = require('mybatis-mapper');
    var param = req.body;

    mybatisMapper.createMapper(['./models/' + param.mapper + '.xml']);

    var format = { language: 'sql', indent: ' ' };

    var query = mybatisMapper.getStatement(param.mapper, param.mapper_id, param, format);

    pool.getConnection(function (err, connection) {
        connection.query(query, function (error, results) {
            if (error) {
                console.log('db error : ', error);
            }
            console.log('db result: ', results);
            if (results != undefined) {

                string = JSON.stringify(results);
                var json = JSON.parse(string);
                if (req.body.crud == 'select') {
                    res.send({ json });
                } else {
                    res.send({ code: 'succ' });
                }
            } else {
                res.send({ code: 'error' });
            }
            connection.release();
        });
    })
})

module.exports = router;