var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles={
var 'article-one':{
     title:'Article-one abbas',
     heading:'Article-one',
     date:'6 sep 2016',
     content:`<p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>
            <p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>
            <p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>`
 },
 var 'article-two':{
     title:'Article-two abbas',
     heading:'Article-two',
     date:'6 sep 2016',
     content:`<p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>
            <p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>
            <p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>`
 },
 var 'article-three':{
     title:'Article-three abbas',
     heading:'Article-three',
     date:'8 sep 2016',
     content:`<p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>
            <p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>
            <p>
                this is content.this is content.this is content.
                this is content.
                this is content.
                this is content.this is content.this is content.this is content.
            </p>`
 }
 
};
 function createtemplate(data)
 {
     var title=data.title;
     var heading=data.heading;
     var date=data.date;
     var content=data.content;
     var htmltemplate=
    `<html>
    <head>
        <title>{$title}</title>
            <meta name="viewport" content="width-device-width,initial-scale=1">
 <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class="container">
         <div>
            <a href="/">home</a>
        </div>
        <hr/>
        <div>
            <h3>
                {$heading}
            </h3>
        </div>
        <div>
            {$date}
        </div>
        <div>
           {$content}
        </div>
    </div>
    </body>
</html>`
;
 }








app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articleName', function (req, res) {
var articleName=req.params.articleName;
res.send(createtemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
