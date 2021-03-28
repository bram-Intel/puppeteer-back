const express = require('express')
const app = express()
const port = 8080
const scrapers = require('./scrapper.js')
path = require('path')


const bodyParser = require('body-parser');


app.use(bodyParser.json())
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers", "Content-Type");
  
  next();	
});


app.get('/', async (req, res) => {

	const channelData = await scrapers.scrapeChannel('https://www.youtube.com/')
    console.log(channelData);
  res.send(channelData);
   
})

app.get('/getImage', function async (req, res) {
 
    res.download(path.join(__dirname, 'images.png'), function (err) {
 
        console.log(err);
 
    });
 
});

app.get('/getPDF', function async (req, res) {
 
    res.download(path.join(__dirname, 'bow.pdf'), function (err) {
 
        console.log(err);
 
    });
 
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})