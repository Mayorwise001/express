const express = require('express')
const result = require('./sqaure')
const app = express()
// const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const request = require('supertest');


// app.get('/', (req, res)=>{
//     // res.send('Hello World, welcome!')
//     res.status(200).json({ name: 'john' });
//     console.log("usernames will be logged here - wip")
// })

request(app)
  .get('/')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .end(function(err, res) {
    if (err) throw err;
  });



app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
  });

  app.put('/users/:userId', (req, res) => {
    return res.send(
      `PUT HTTP method on user/${req.params.userId} resource`,
    );
  });


  app.post('/messages', (req, res) => {
    const id = uuidv4();
    const date = Date.parse(req.body.date);
const count = Number(req.body.count);
    const message = {
      id,
    };
  
    messages[id] = message;
  
    return res.send(message);
  });
// app.listen(port, ()=>{
//     console.log(`Example app listening on port ${port}`)
// })
