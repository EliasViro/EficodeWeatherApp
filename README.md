# EficodeWeatherApp

## Prequisities
An [openweathermap](http://openweathermap.org/) API key.

## Project structure

* backend
    * http REST API
    * fetch URL - fetches weather data on request from openweathermap based on given coordinates
    * node
    * koa
    * dockerfile

* frontend
    * node + webpack
    * static file server serving weather icons
    * image fetching based on weather data
    * react + babel
    * dockerfile

## Building and running the program

1. Open terminal
2. Locate project directory
3. Run `docker-compose up --build`
4. Open browser and go to `localhost:8080`

> If you want to change the weather query location, change the `LAT` and `LON` values in `frontend/src/index.jsx`


## Project learning

* familiarizing myself with using terminal and Git
* react + javascript + html tags + babel
* ip addresses and private networking
* creating docker images and containers + docker files
* creating http server with node
* rest api get requests and url queries
* webpack usage and dev server
* avoiding clogging my SSD with docker images