// express requirements
const express = require('express');
const app = express();
app.use(express.static('server/public'));

// body parser requirements
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// port requirements
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})
 
