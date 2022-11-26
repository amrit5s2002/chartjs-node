const express = require('express');
const path = require('path');
const mysql = require('mysql');
const { Chart } = require('chart.js');
const app = express();



app.set('view engine', 'pug');

const port = process.env.PORT || 8080;
const dates = [];
const rank =[];
var month,dnum

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sampledata'
});


app.get('/', function(req, res){
    pool.connect(function(err) {
        if (err) throw err;
        pool.query("SELECT `Rank`,`Date` FROM chart_sample", function (err, result, fields) {
          for(i=1;i<Object.keys(result).length;i++){
            d = result[i].Date;
            d = String(d);
            month = d.substr(4,4);
            if (month.includes('Oct')){
              month = '10';
            }
            dnum = d.substr(8,2);
            
            

            dyr = d.substr(11,4);
            // console.log(dyr)


            d = dyr+'-'+month+'-'+dnum;
            // console.log(result[i].rank)
            r = result[i].Rank;
            // console.log(d)
            dates.push(d);
            rank.push(r);
              
          };
          
          res.render('chart', {
            // title: 'Search Hacker News',
            data: dates,
            rank: rank
          });
    });
    
});
});



app.listen(port);
console.log('Server started at http://localhost:' + port);
