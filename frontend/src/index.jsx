import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const LAT = 20;
const LON = 0;

class HTTPResponseError extends Error {
	constructor(response, ...args) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
		this.response = response;
	}
}

const getWeatherFromApi = async (lat, lon) => {
  const response = await fetch(`${baseURL}/weather?lat=${lat}&lon=${lon}`);
  if (response.ok) {
    return response.json();
  } 
  else {
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
    this.setState({icon: weather.icon.slice(0, -1)});
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

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
