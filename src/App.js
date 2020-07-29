import React from "react";
import "./App.css";
import Clouds from "./clouds.jpg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityText: "",
      city: "London",
      temperature: "",
      weatherMain: "", //clear, rain, snow, clouds, extreme, other
    };
    this.getData = this.getData.bind(this);
    this.cityChange = this.cityChange.bind(this);
  }
  async componentDidMount() {
    try {
      let data = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d681c7020ea993ab41891e2760024057"
      );
      let readable = await data.json();
      this.setState({ temperature: readable.main.temp });
      this.setState({ weather: readable.weather[0].description });
      this.setState({ weatherMain: readable.weather[0].main });
    } catch (error) {
      console.log(error);
    }
  }
  async getData() {
    try {
      let dataRequest = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          this.state.cityText +
          "&APPID=d681c7020ea993ab41891e2760024057"
      );
      let usable = await dataRequest.json();
      if (usable.cod === "404") {
        console.log("Error, city not found!");
      } else {
        this.setState({ city: usable.name });
        this.setState({ temperature: usable.main.temp });
        this.setState({ weather: usable.weather[0].description });
        this.setState({ weatherMain: usable.weather[0].main });
        console.log(usable);
      }
    } catch (error) {
      console.log(error);
    }
  }
  cityChange(event) {
    this.setState({ cityText: event.target.value });
  }
  render() {
    return (
      <div>
        <div id="title">
          <h1>Weather App</h1>
          <div id="subtitle">
            <h2>By Kevin Satti</h2>
          </div>
        </div>
        <div id="container" className={this.state.weatherMain}>
          <div>
            <input id="input" type="text" onChange={this.cityChange}></input>
            <div></div>
            <button onClick={this.getData}>Enter City</button>
            <br></br>
            <br></br>
            <br></br>
            <div>City: {this.state.city}</div>
            <div>
              Temperature: {Math.round(this.state.temperature - 273.15) + "°C"}
            </div>
            <div>Weather: {this.state.weatherMain}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
