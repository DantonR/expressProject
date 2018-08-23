const express = require('express')
const app = express()
const path = require('path')
const Twitter = require('twitter')
const config = require('./config')

var client = new Twitter({
  consumer_key: config.TConsumerKey,
  consumer_secret: config.TConsumerKeySecret,
  access_token_key: config.TAccessToken,
  access_token_secret: config.TAccessTokenSecret
})

app.use(function(req, res, next){
  console.log(`${req.method} request for ${req.url}`);
  next();
})

app.use(express.static('./public'))
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))
// app.use('/bootstrapStyle', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css')))
app.use('/jqueryScript', express.static(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js')))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/about', function(req, res){
  res.sendfile(__dirname + '/public/about.html')
})

app.get('/search=:term', function(req, res){
  var term = req.params.term
  var params = {
    q: term,
    count: 1
  }
  client.get('search/tweets', params, function(err, tweet, twitterRes){
    if(!err){
      res.json(tweet);
    }
  })
})
  

// app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.set('port', (process.env.PORT || 3000))
app.listen(app.get('port'), function(){
  console.log('Server is running on port ' + app.get('port'));
})

  
  