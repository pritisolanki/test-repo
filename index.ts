import express = require('express');

// Create a new express application instance
const app: express.Application = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const pg = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'test',
    password : 'test',
    database : 'test'
  }
});

app.get('/', function(req, res) {
  res.send('Hello Test Task!');
});

app.post('/add', urlencodedParser, function(req, res) {
  if(!req.body) {
    return res.sendStatus(400);
  }
  const name = req.body['product_name'];

  pg('cart').select('*').where('product_name', name).first()
      .then((data: any) => {
        if(data) {
          res.send('Product exists');
          return;
        }
        pg('cart').insert(req.body)
            .then(() => console.log('Product added to the database'))
            .then(res.send('Product added to the database'))
            .catch('Error!!!');
      })
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000');
});

module.exports = app;