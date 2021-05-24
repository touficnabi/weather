import { Component } from 'react';
// import axios from 'axios';
import './App.scss';
import Homepage from './components/Homepage';

class App extends Component{

    state = {
        lat: 23.796753,
        long: 90.375807,
        location: true
    }

    //CALLING FOR GEOLOCATION
    getLocation = () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                const lat = pos.coords.latitude;
                const long = pos.coords.longitude;
                
                this.setState({
                    lat,
                    long,
                    location: true
                })
            })
        }
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
