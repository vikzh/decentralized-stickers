const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/get-all-ntfs', (req, res) => {
    const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({
	  "id": 67,
	  "jsonrpc": "2.0",
	  "method": "qn_fetchNFTsByCollection",
	  "params": [{
	    "collection": "0xE28D2D8746D855251BA677a91626009CB33aA4F9",
	    "page": 1,
	    "perPage": 10
	  }]
	});

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch(process.env.ENV_VARIABLE, requestOptions)
	  .then(response => response.text())
	  .then((result) => {
	  	console.log('result from quick node', result);
	  	res.send(result)})
	  .catch(error => console.log('error', error));

});

app.listen(8080, () => console.log(`Hello world app listening on port ${8080}!`))
