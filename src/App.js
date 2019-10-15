import React from 'react';

import './App.css';

import Weather from "./components/Weather"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import Form from "./components/Form";


const Api_Key="079b76b390ad70c628a14a9a141e5992";

class App extends React.Component {

    constructor(){
        super();
        this.state={
            city: undefined,
            country: undefined,
            icon: undefined,
            temp_max: undefined,
            temp_min: undefined,
            celsius:undefined,
            description: undefined,
            error: false
        };
        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog"
        };
    }

    calCelsius(temp){
    let cell=Math.floor(temp-273.15)
        return cell;
    }

    getWeatherIcon(icons, rangeID){
        switch (true) {
            case rangeID>=200 && rangeID<=232:
                this.setState({icon:this.weatherIcon.Thunderstorm});
                break;
            case rangeID>=300 && rangeID<=321:
                this.setState({icon:this.weatherIcon.Drizzle});
                break;
            case rangeID>=500 && rangeID<=531:
                this.setState({icon:this.weatherIcon.Rain});
                break;
            case rangeID>=600 && rangeID<=622:
                this.setState({icon:this.weatherIcon.Snow});
                break;
            case rangeID>=700 && rangeID<=781:
                this.setState({icon:this.weatherIcon.Atmosphere});
                break;
            case rangeID===800:
                this.setState({icon:this.weatherIcon.Clear});
                break;
            case rangeID>=801 && rangeID<=804:
                this.setState({icon:this.weatherIcon.Clouds});
                break;
            default:
                this.setState({icon:this.weatherIcon.Clouds});



        }
    }

    getWeather= async (event)=>{
        event.preventDefault();

        const city=event.target.city.value;
        const country=event.target.country.value;

       if (city && country)
       {
           const api_call = await fetch(
               `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`,
           );

           const response = await api_call.json();

           this.setState({
               city: `${response.name},${response.sys.country}`,
               temp_max: this.calCelsius(response.main.temp_max),
               temp_min: this.calCelsius(response.main.temp_min),
               celsius:this.calCelsius(response.main.temp),
               description: response.weather[0].description,
               error: false
           })

           this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
       }else {
           this.setState({error: true})
       }

    }

    render()
    {
        return (
            <div className="App">
                <Form loadWeather={this.getWeather} error={this.state.error}/>
                <Weather
                    city={this.state.city}
                    country={this.state.country}
                    celsius={this.state.celsius}
                    temp_min={this.state.temp_min}
                    temp_max={this.state.temp_max}
                    icon={this.state.icon}
                    main={this.state.main}
                    description={this.state.description}
                />
            </div>
        )
    }

}
export default App;
