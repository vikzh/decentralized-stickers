import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// const express = require('express');
// const bodyParser = require('body-parser');
// var cors = require('cors');
import { Headers } from 'node-fetch';
import dotenv from 'dotenv';
import fetch from "node-fetch";

dotenv.config();
const app = express();



app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.use(cors());
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
	    "collection": "0x2B993840c63b3e6487B283e8c65ddCE84D1EB4BD",
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

	fetch(`https://multi-thrilling-sheet.matic.quiknode.pro/${process.env.QUICKNODE_KEY}/`, requestOptions)
	  .then(response => response.text())
	  .then((result) => {
	  	console.log('result from quick node', result);
	  	res.send(result)})
	  .catch(error => console.log('error', error));

});

app.listen(8080, () => console.log(`Hello world app listening on port ${8080}!`))
