const express = require('express');
const path = require('path');
const mysql = require('mysql');
const { Chart } = require('chart.js');
const app = express();
app.set('view engine', 'pug');
const port = process.env.PORT || 8080;
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')


const dates = [];
const rank =[];
var month,dnum

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'sampledata'
});


app.get('/', function(req, res){
    pool.connect(function(err) {
        if (err) throw err;
        pool.query("SELECT `Rank`,`Date` FROM chart_sample", function (err, result, fields) {
          for(i=1;i<Object.keys(result).length;i++){
            d = result[i].Date;
            d = String(d);
            // console.log(typeof(d))
            month = d.substr(4,4);
            // console.log(month)
            if (month.includes('Oct')){
              month = '10';
              // console.log(month)
            }
            dnum = d.substr(8,2);
            // console.log(dnum)
            

            dyr = d.substr(11,4);
            // console.log(dyr)


            d = dyr+'-'+month+'-'+dnum;
            // console.log(result[i].rank)
            r = result[i].Rank;
            // console.log(d)
            dates.push(d);
            rank.push(r);
            

            // console.log('working')
            // console.log(__dirname)
            
            
          };

          
          // const data = {
          //   labels: dates,
          //   datasets: [{
          //     label: '',
          //     backgroundColor: 'rgb(255, 99, 132)',
          //     borderColor: 'rgb(255, 99, 132)',
          //     data: rank,
          // }]
          // };
          // const config = {
          //   type: 'line',
          //   data,
          //   options: {}
          // };
          

          // const myChart = new Chart(
          //   document.getElementById('myChart'),
          //   config
          // );

          // console.log(rank)
          // console.log(dates)
          // console.log(rank)
          // var data = { message1 :dates, message2 :rank };
          // console.log(dates);
          // module.exports = {result};
          
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
