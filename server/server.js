const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const router = require('./routes/router')


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/tasks', router); // assigned current url, rest here is boilerplate
app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})
