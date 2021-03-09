import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './Home.scss'

class Home extends Component {
    state = {
        name: 'anonymous'
    }

    render() {
    return (
        <div className="home">
            <div className="input-wrapper">
            <input 
                className="user-name"
                onChange={ (event) => this.setState({ name: event.target.value})}
                placeholder="Enter Your Name" 
            />
            <div className="wooden-text">
                <Link className="link-start" to={{pathname: "/game", userName: this.state.name}}>Start the Game!</Link>
            </div>      
            </div>
        </div>
    )
}
}

export default Home