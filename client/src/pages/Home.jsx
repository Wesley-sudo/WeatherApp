import Forecast from "../components/Forecast";
import React, { Component } from "react";

class Home extends Component {
    constructor( weatherData ) {
        super(weatherData);
        this.state = { temperatureToggle: false }
    }

    toggleTemperature() {
        this.setState({ temperatureToggle: !this.state.temperatureToggle })
    }

    render() {
        return (
            <div className="home">
                <div className="card">
                    <div className="upper-half">
                        <div className="section1">
                            <div className="location-date">
                            {/* { console.log( this.props.weatherData ) } */}
                                <h2>{ this.props.weatherData.location.name + ", " + this.props.weatherData.location.region }</h2>
                                <h3>{ new Date( this.props.weatherData.location.localtime ).toDateString() }</h3>    
                            </div>
                            <div className="today-icon">
                                <img src={ this.props.weatherData.current.condition.icon } alt={ this.props.weatherData.current.condition.text } />
                            </div>
                        </div>
                        <div className="section2">
                            <div className="temperature">
                                { this.state.temperatureToggle ? 
                                    this.props.weatherData.current.temp_f + "°" : 
                                    this.props.weatherData.current.temp_c + "°" }
                            </div>
                            <div className="conversion">
                                <div className="celc-faren">
                                    { this.state.temperatureToggle ? this.props.weatherData.forecast.forecastday[0].day.mintemp_f + "°" + "/" + this.props.weatherData.forecast.forecastday[0].day.maxtemp_f + "°" : this.props.weatherData.forecast.forecastday[0].day.mintemp_c + "°" + "/" + this.props.weatherData.forecast.forecastday[0].day.maxtemp_c + "°" }
                                </div>
                                <div className="convert-temp" onClick={ () => this.toggleTemperature() }>
                                    <svg viewBox="0 0 45 45"><path d="M24 44Q19.85 44 16.925 41.075Q14 38.15 14 34Q14 31.45 15.15 29.2Q16.3 26.95 18.55 25.85V9.45Q18.55 7.2 20.15 5.6Q21.75 4 24 4Q26.25 4 27.85 5.6Q29.45 7.2 29.45 9.45V25.85Q31.7 26.95 32.85 29.2Q34 31.45 34 34Q34 38.15 31.075 41.075Q28.15 44 24 44ZM21.55 22.25H26.45V19.6H24V17.65H26.45V13.3H24V11.35H26.45V9.45Q26.45 8.4 25.75 7.7Q25.05 7 24 7Q22.95 7 22.25 7.7Q21.55 8.4 21.55 9.45Z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-half">
                        <div className="selection">
                            <div className="selectors">Hourly</div>
                            <div className="selectors">Daily</div>
                            <div className="selectors">Details</div>
                        </div>
                        <div className="forecast">
                            <Forecast date={"Now"} icon={ this.props.weatherData.current.condition.icon } iconName={ this.props.weatherData.current.condition.text } temp={ this.props.weatherData.current.temp_c + "°" }/>
                            <Forecast date={"6 pm"} icon={"clear"} iconName={" "} temp={"26°"}/>
                            <Forecast date={"8 pm"} icon={"clear"} iconName={" "} temp={"25°"}/>
                            <Forecast date={"10 pm"} icon={"cloudy"} iconName={" "} temp={"23°"}/>
                            <Forecast date={"12 pm"} icon={"heavy"} iconName={" "} temp={"21°"}/>
                            <Forecast date={"2 am"} icon={"rainy"} iconName={" "} temp={"22°"}/>
                            <Forecast date={"4 am"} icon={"heavy-rain"} iconName={" "} temp={"23°"}/>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default Home