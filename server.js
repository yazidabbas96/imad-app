var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyparser=require('body-parser');
var config={
    user:'yazidabbas96',
    database:'yazidabbas96',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
var counter=0;
app.get('/counter', function (req, res) {
  counter=counter+1;
  res.send(counter.toString())
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt)
{
    var hashed= crypto.pbkdf2Sync(input,salt, 100000, 64, 'sha512');
    return ["pbkdf2Sync","100000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function (req, res) {
var hs=hash(req.params.input,'this- is -random -string');
res.send(hs);
});

 var pool=new Pool(config);
 
app.post('/create-user', function (req, res) {
    var username=req.body.username;
    var password=req.body.password;
 var salt=crypto.randomBytes(128).toString('hex');
 var dbString=hash(password,salt);
 pool.query('INSERT INTO "user2" (username,password) VALUES  ($1,$2)',[username,dbString], function (err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send("user has been successfully created");
        }});
 
});

app.post('/login', function (req, res) {
    var username=req.body.username;
    var password=req.body.password;
 pool.query('select * from  "user2" where username=$1',[username], function (err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(results.rows.length===0){
                res.send(403).send('username/pass invalid');
            }
            else{
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hp=hash(password,salt);
                if(hp==dbString)
                {
                    res.send("correct credentials");
                }
                else
                {
                    res.send(403).send('username/pass invalid');
                }
            }
        
            
        
            
        
                
        }});
 
});

 
app.get('/test-db', function (req, res) {
    pool.query('SELECT * from test', function (err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result));
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});