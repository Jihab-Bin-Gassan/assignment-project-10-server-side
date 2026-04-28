const express = require('express');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('user server is available');
});

// To do save to the database
const users = [
  { id: 1, name: 'sabana', email: 'sabana@gmail.com' },
  { id: 2, name: 'sabnoor', email: 'sabnoor@gmail.com' },
  { id: 3, name: 'sablila noor', email: 'sablila@gmail.com' },
];

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
  console.log('post method called', req.body);
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`user server started on port: ${port}`);
});
