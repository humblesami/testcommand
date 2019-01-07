var fs = require("fs");
var http = require("http");

var express = require("express");
var app = express();

app.use("/", express.static("./html"));
app.all("/", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var webserver = http.createServer(app);


const { exec } = require('child_process');
app.get('/command', function(req, res){
    try{
        req = req.query;
        exec('git pull origin test', (err, stdout, stderr) => {
            if (err) {
                console.log(`stderr: ${stderr}`);
                res.send(err.message);
            }
            else
            {
                console.log(`stdout: ${stdout}`);
                res.send('Done');
            }
        });
    }
    catch (er) {
        console.log(er);
        res.send(er.message)
    }
});
var server_port = 4000;
webserver.listen(server_port, "0.0.0.0");
console.log("Listening " + server_port);

