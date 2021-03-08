import React, { Component } from 'react'

import Close from './../../assets/close.png'
import './Card.scss'

export default class Card extends Component {
    render() {
    const {troop, onClickHandler} = this.props;
    return (
        <div className="card">
            {<img 
                onClick={onClickHandler}
                className={troop.open ? 'card-open' : 'card-close' } 
                src={troop.open ? troop.image : Close }
                alt={troop.open ? troop.name: 'hidden'}
            /> }
        </div>
    )
    }
}
