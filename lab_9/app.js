const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const data_handler = require('./data_handler')

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/html_src/home.html'));
})

app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname + '/html_src/reserve.html'));
})

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname + '/html_src/tables.html'));
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.post('/reservation', function (req, res){

  const result = data_handler.save_data('./reservations_data/reservations.json', req.body.data);
  res.json({"success": result});
 
});

app.post('/clear_table', (req, res) => {
  res.send(data_handler.delete_data('./reservations_data/reservations.json'));
})

app.get('/get_reservations', function (req, res) {
  res.send(data_handler.get_data('./reservations_data/reservations.json'));
})

app.get('/api/tables', (req, res) => {
  res.send(data_handler.get_data('./reservations_data/reservations.json').reservations);
})

app.get('/api/waitlist', (req, res) => {
  res.send(data_handler.get_data('./reservations_data/reservations.json').wait_list);
})