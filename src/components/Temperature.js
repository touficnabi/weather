import React, { Component } from 'react'

export default class Temperature extends Component {

    render() {
        const { temperature, feelsLike, windDir, windSpeed, desc, unit, makeItFahrenheit } = this.props;
        return (
            <div className="weather-info">
                <h3>{desc}</h3>
                <h1 className="temperature">{ unit === 'C' ? Math.round(temperature) : Math.round(makeItFahrenheit(temperature))}<span dangerouslySetInnerHTML={ unit === "C" ? {__html: "&#8451"} : {__html: "&#8457"}}></span></h1>
                <h5 className="feels">Feels Like: {unit === 'C' ? Math.round(feelsLike) : Math.round(makeItFahrenheit(feelsLike))}</h5>
                <h5 className="wind">Wind: {windSpeed} {windDir}</h5>
            </div>
        )
    }
}
