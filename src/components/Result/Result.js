import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
import './Result.scss'

class Result extends Component {
    render() {
        const {level} = this.props.location;

        return (
        <div className="result">
        {(this.props.location.score === 0)?
            <div className="wooden-text"> 
                <h1>You are loser </h1>
                <Link to={{pathname: '/home'}}>Try Again </Link>
            </div>
                :
            (this.props.location.level < 3 && this.props.location.score !== 0) ? 
            <div className="next-level">
                <div className="wooden-text">
                <div className="level">Level {level} completed! </div>
                <Link to={{pathname: "/game", 
                    userName: this.props.location.userName, 
                    score: this.props.location.score, 
                    level: this.props.location.level+1
                }}>
                    Next Level
                </Link>
                    </div>      
            </div> :
            <div class="wooden-text">
                <div className="score" >Your Score: {this.props.location.score}</div>
                <Link to={{pathname: '/home'}}>Play Again </Link>

            </div>
        }
        </div>

        )
    }
}

export default withRouter(Result)