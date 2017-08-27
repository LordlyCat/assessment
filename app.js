var express = require('express'),
    app = express(),
    body_parser = require('body-parser'),
    http = require('http').Server(app),
    path = require('path'),
    mysql = require('mysql'),
    port = 9090,

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '88068806',
        database: 'forecast'
    });

//连接数据库
connection.connect();

//********************************************************************
app.use(express.static(path.join(__dirname, 'public/')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: false
}));


var sql = 'SELECT * FROM data';

app.get('/app.js', function(req, res) {

    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err);
            return false;
        }
        res.send(result);
    })
})

http.listen(port, function() {
    console.log('listening on ' + port);
});



//The end