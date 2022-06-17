import Forecast from "../components/Forecast";
import Details from "../components/Details";
import React, { Component } from "react";

class Home extends Component {
    constructor( weatherData ) {
        super(weatherData);
        this.state = { 
            temperatureToggle: false,
            hourlyToggle: true,
            dailyToggle: false,
            detailsToggle: false,
            hourlyIndex: 0
        }
    }

    toggleTemperature() {
        this.setState({ temperatureToggle: !this.state.temperatureToggle })
    }
    toggleHourly() {
        this.setState({ 
            hourlyToggle: true,
            dailyToggle: false,
            detailsToggle: false
        })
    }
    toggleDaily() {
        this.setState({ 
            hourlyToggle: false,
            dailyToggle: true,
            detailsToggle: false
        })
    }
    toggleDetails() {
        this.setState({ 
            hourlyToggle: false,
            dailyToggle: false,
            detailsToggle: true
        })
    }

    toTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
    componentDidMount() {
        for ( let hour = 0; hour < 23; hour++ ) {
            if ( new Date(this.props.weatherData.location.localtime).getTime() < new Date(this.props.weatherData.forecast.forecastday[0].hour[hour].time).getTime() ) {
                this.setState({ hourlyIndex: hour });
                break;
            }
        }
    }

    render() {
        const forecasts = [<Forecast date={"Now"} 
                                icon={ this.props.weatherData.current.condition.icon } 
                                iconName={ this.props.weatherData.current.condition.text } 
                                temp={ this.state.temperatureToggle ? this.props.weatherData.current.temp_f + "°F" : this.props.weatherData.current.temp_c + "°C" }/>];
        for (let x = 0; x < 5; x++) {
            if ((this.state.hourlyIndex + x) > 23){
                forecasts.push(<Forecast key={x} date={ this.toTime(new Date(this.props.weatherData.forecast.forecastday[1].hour[x - (24 - this.state.hourlyIndex)].time)) } 
                                icon={ this.props.weatherData.forecast.forecastday[1].hour[x].condition.icon } 
                                iconName={ this.props.weatherData.forecast.forecastday[1].hour[x].condition.text } 
                                temp={ this.state.temperatureToggle ? this.props.weatherData.forecast.forecastday[1].hour[x].temp_f + "°F" : this.props.weatherData.forecast.forecastday[1].hour[x].temp_c + "°C" }/>)
            }
            else {
                forecasts.push(<Forecast key={x} date={ this.toTime(new Date(this.props.weatherData.forecast.forecastday[0].hour[this.state.hourlyIndex + x].time)) } 
                                    icon={ this.props.weatherData.forecast.forecastday[0].hour[this.state.hourlyIndex + x].condition.icon } 
                                    iconName={ this.props.weatherData.forecast.forecastday[0].hour[this.state.hourlyIndex + x].condition.text } 
                                    temp={ this.state.temperatureToggle ? this.props.weatherData.forecast.forecastday[0].hour[this.state.hourlyIndex + x].temp_f + "°F" : this.props.weatherData.forecast.forecastday[0].hour[this.state.hourlyIndex + x].temp_c + "°C" }/>)
            }
        }

        const dailyForecast = [<Forecast date={"Now"} 
                                    icon={ this.props.weatherData.current.condition.icon } 
                                    iconName={ this.props.weatherData.current.condition.text } 
                                    temp={ this.state.temperatureToggle ? this.props.weatherData.current.temp_f + "°F" : this.props.weatherData.current.temp_c + "°C" }/>];
        for (let x = 0; x < 2; x++) {
            dailyForecast.push(<Forecast key={x+10} date={ new Date(this.props.weatherData.forecast.forecastday[x + 1].hour[this.state.hourlyIndex].time).toDateString() } 
                                icon={ this.props.weatherData.forecast.forecastday[x + 1].hour[this.state.hourlyIndex].condition.icon } 
                                iconName={ this.props.weatherData.forecast.forecastday[x + 1].hour[this.state.hourlyIndex].condition.text } 
                                temp={ this.state.temperatureToggle ? this.props.weatherData.forecast.forecastday[x + 1].hour[this.state.hourlyIndex].temp_f + "°F" : this.props.weatherData.forecast.forecastday[x + 1].hour[this.state.hourlyIndex].temp_c + "°C" }/>)
        }

        const details = [<Details key={100} 
                            windDir={ this.props.weatherData.current.wind_dir }
                            windDeg={ this.props.weatherData.current.wind_degree }
                            windKph={ this.props.weatherData.current.wind_kph }
                            humidity={ this.props.weatherData.current.humidity }
                            gustKph={ this.props.weatherData.current.gust_kph }
                            cloud={ this.props.weatherData.current.cloud }
                             />];
        return (
            <div className="home">
                <div className="card">
                    <div className="upper-half">
                        <div className="section1">
                            <div className="location-date">
                                <h2>{ this.props.weatherData.location.name === this.props.weatherData.location.region ? this.props.weatherData.location.name : this.props.weatherData.location.name + ", " + this.props.weatherData.location.region }</h2>
                                <h3>{ new Date( this.props.weatherData.location.localtime ).toDateString() }</h3>    
                            </div>
                            <div className="today-icon">
                                <img src={ this.props.weatherData.current.condition.icon } alt={ this.props.weatherData.current.condition.text } />
                            </div>
                        </div>
                        <div className="section2">
                            <div className="temperature">
                                { this.state.temperatureToggle ? this.props.weatherData.current.temp_f + "°F" : this.props.weatherData.current.temp_c + "°C" }
                            </div>
                            <div className="conversion">
                                <div className="celc-faren">
                                    { this.state.temperatureToggle ? this.props.weatherData.forecast.forecastday[0].day.mintemp_f + "°F" + " / " + this.props.weatherData.forecast.forecastday[0].day.maxtemp_f + "°F" : this.props.weatherData.forecast.forecastday[0].day.mintemp_c + "°C" + " / " + this.props.weatherData.forecast.forecastday[0].day.maxtemp_c + "°C" }
                                </div>
                                <div className="convert-temp" onClick={ () => this.toggleTemperature() }>
                                    <svg viewBox="0 0 45 45"><path d="M24 44Q19.85 44 16.925 41.075Q14 38.15 14 34Q14 31.45 15.15 29.2Q16.3 26.95 18.55 25.85V9.45Q18.55 7.2 20.15 5.6Q21.75 4 24 4Q26.25 4 27.85 5.6Q29.45 7.2 29.45 9.45V25.85Q31.7 26.95 32.85 29.2Q34 31.45 34 34Q34 38.15 31.075 41.075Q28.15 44 24 44ZM21.55 22.25H26.45V19.6H24V17.65H26.45V13.3H24V11.35H26.45V9.45Q26.45 8.4 25.75 7.7Q25.05 7 24 7Q22.95 7 22.25 7.7Q21.55 8.4 21.55 9.45Z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-half">
                        <div className="selection">
                            <div className="selectors" onClick={ () => this.toggleHourly() }>Hourly</div>
                            <div className="selectors" onClick={ () => this.toggleDaily() }>Daily</div>
                            <div className="selectors" onClick={ () => this.toggleDetails() }>Details</div>
                        </div>
                        <div className="forecast">                    
                            { this.state.hourlyToggle ? forecasts : null}
                            { this.state.dailyToggle ? dailyForecast : null}
                            { this.state.detailsToggle ? details : null}
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default Home