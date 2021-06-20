import { Component } from 'react';
import axios from 'axios';
import './App.scss';
import Homepage from './components/Homepage';

class App extends Component{

    state = {
        lat: 22.796753,
        long: 90.375807,
        location: false
    }

    //CALLING FOR GEOLOCATION
    getLocation = () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationFailed)
        }
    }

    //IF USER ALLOWS THE LOCATION
    geolocationSuccess = pos => {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;

        this.setState({
            lat,
            long,
            location: true
        })
    }

    //IF USER DOES NOT ALLOWS THE LOCATION
    geolocationFailed = error => {
        console.log('Geolocation error', error)
        //axios.get('https://ipapi.co/latlong/').then(res => {
        axios.get('http://api.ipstack.com/check?access_key=278115d3f1f7fbd26854ab640dae5e60').then(res => {
            console.log(res.data)
            const lat = res.data.latitude;
            const long = res.data.longitude;
            //const data = res.data.split(/[,]+/)
            //const lat = data[0];
            //const long = data[1];

            this.setState({
                lat,
                long,
                location : true
            })
        })
    }

    componentDidMount(){
        this.getLocation();
    }

    render(){

        const { lat, long, location } = this.state;
        if (location){
            return(
                <Homepage lat={lat} long={long} location={location} />
            );
        } 
        return(
            <h1 style={{color: "black"}}>Please turn on the location</h1>
        )
    }
}

export default App;
