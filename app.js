const express = require('express')
const server = express()
const pg = require('pg');
const config = {
  user: 'postgres',
  database: 'prueba2',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var query = 'select * from cliente';


var querySelect = function(query){
  var client = new pg.Client(config);
  client.connect( (err) => {
    if (err) throw err;
    client.query(query,  (err, result) => {
      if (err) throw err;
      console.log(result.rows); // outputs: { name: 'brianc' }
      client.end( (err) => {
        if (err) throw err;
      });
    });
  });


}

server.get('/', (req, response) => {
  var resultado = querySelect(query)
  response.send(resultado)
})

server.listen(3000,  () =>  console.log('Example app listening on port 3000!'))
