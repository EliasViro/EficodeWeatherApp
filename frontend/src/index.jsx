import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const LAT = 20; //Latitude
const LON = 0; //Longitude

class HTTPResponseError extends Error { //Custom error class
	constructor(response, ...args) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
		this.response = response;
	}
}

const getWeatherFromApi = async (lat, lon) => {
  const response = await fetch(`${baseURL}/weather?lat=${lat}&lon=${lon}`);
  if (response.ok) { //Response ok
    return response.json();
  } 
  else { //Errors
		throw new HTTPResponseError(response);
	}
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
    };
  }

  async componentDidMount() {
    const weather = await getWeatherFromApi(LAT, LON);
    this.setState({icon: weather.icon.slice(0, -1)}); //Take two first numbers from icon string
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} /> } 
      </div>
    );
  }
}

ReactDOM.render( //Fetch app by app ID from dom and render the weather component inside
  <Weather />,
  document.getElementById('app')
);
