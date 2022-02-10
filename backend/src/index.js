require('dotenv').config();
const debug = require('debug')('weathermap');
const Koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";

//Custom error class for fetch errors
class HTTPResponseError extends Error {
	constructor(response, ...args) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
		this.response = response;
	}
}

const port = process.env.PORT || 9000; //Backend port

const app = new Koa();
app.use(logger());

app.use(cors());

const fetchWeather = async (lat, lon) => {
  //Openweathermap query URL with coordinates
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&`;
  const response = await fetch(endpoint);
  if (response.ok) { //Status 200-299
    return response.json();
  } 
  else { //Request failure
		throw new HTTPResponseError(response);
	}
};

router.get('/api/weather', async ctx => {
  const {lat, lon} = ctx.query;
  if (lat === undefined || lon === undefined) { //Check if lat and lon are defined
    ctx.throw(400, 'latitude or longitude missing.'); 
  }
  const weatherData = await fetchWeather(lat, lon);
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

router.get('/', async ctx => {
  ctx.body = "Nothing to see here. The frontend is at localhost:8080.";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);