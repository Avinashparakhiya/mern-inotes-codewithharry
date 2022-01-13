const connectToMongo = require('./db');
const express = require('express');
const routes = require('./routes/auth');
const notes = require('./routes/notes');
connectToMongo();
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/auth', routes);
app.use('/api/auth', notes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
