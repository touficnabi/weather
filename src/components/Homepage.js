import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Cookies from "js-cookie";
import Temperature from "./Temperature";
import UnitButton from './UnitButton';


export class Homepage extends Component {

    state = {
        temp: null,
        windSpeed: null,
        windDir: null,
        feelsLike : null,
        precipitation : null,
        pod: null,
        desc: null,
        city: null,
        unit: 'C',
        greeting: null,
        isLoaded: false
    }

    makeItFahrenheit = c => {
        const farenheit = ( c * 1.8 ) + 32;
        return farenheit;
    }

    makeItCelcius = f => {
        const celcius = ( f - 32 ) / 1.8;
        return celcius;
    }

    //SET UP COOKIE FOR THE UNIT
    setupCookie = () => {
        const unit = Cookies.get('unit');
        if (unit) {
            this.setState({unit});
        } else{ 
            Cookies.set('unit', this.state.unit)
        }
    }


    //SETUP UNIT
    setupUnit = () =>{
        if (this.state.unit === "C"){
            this.setState({ unit: "F" })
            Cookies.set('unit', 'F')
        } else {
            this.setState({ unit: "C" })
            Cookies.set('unit', 'C')
        }
    }

    
    //SETUP GREETINGS
    greeting = () => {
        let today = new Date()
        let curHr = today.getHours()

        if (curHr < 12) {
            this.setState({greeting: "Good Morning!"})
        } else if (curHr < 18) {
            this.setState({greeting: "Good Afternoon!"})
        } else {
            this.setState({greeting: "Good Evening!"})
        }
    }
    

    componentDidMount(){

        const { lat, long } = this.props;

        axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=8f0f909bae4947f3a7459229d96734bf`).then(res => {
            const data = res.data.data[0];

            console.log('log from isha', data)

            const temp = data.temp;
            const windSpeed = data.wind_spd;
            const windDir = data.wind_cdir;
            const feelsLike = data.app_temp;
            const pod = data.pod;
            const desc = data.weather.description;
            const city = data.city_name;
            const precipitation = data.precip;

            this.setState({
                temp,
                windSpeed,
                windDir,
                feelsLike,
                precipitation,
                pod,
                desc,
                city,
                isLoaded: true
            })

        })

        this.greeting();
        this.setupCookie();
    }

    render() {
        const { isLoaded, temp, city, desc, windSpeed, precipitation, windDir, feelsLike, pod, unit, greeting } = this.state;
        const searchQ = desc !== null ? desc.split(' ').join(',') : '';
        const imageURL = `https://source.unsplash.com/1920x1080/?${searchQ}`;
        console.log(imageURL)
        if (isLoaded){
            return (
                <Fragment>
                    <div className={`wrapper ${pod}`} style={{backgroundImage : 'url(' + imageURL + ')'}}>

                        <div className="container">
                            <div className="header">
                                <UnitButton unit={unit} setupUnit={this.setupUnit} />
                                
                                <div className="center">
                                    <h2 className="city">{city}</h2>
                                    <p>{greeting}</p>
                                </div>

                            </div>

                            <Temperature temperature={temp} desc={desc} feelsLike={feelsLike} windSpeed={windSpeed} windDir={windDir} unit={unit} makeItFahrenheit={this.makeItFahrenheit} />
                            <h4>Precipitation: {precipitation}%</h4>
                        </div>
                    </div>
                </Fragment>
            )
        }
        
        return(
            <p>Loading... </p>
        )
    }
}

export default Homepage
