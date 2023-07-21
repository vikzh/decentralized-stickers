const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(8080, () => console.log(`Hello world app listening on port ${8080}!`))
