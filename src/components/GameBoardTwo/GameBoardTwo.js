import React, { Component } from 'react'

import { shuffle } from 'lodash';

import Card from '../Card/Card';

import './GameBoardTwo.scss';

import archer from './../../assets/archer.png'
import barbar from './../../assets/barbar.png'
import dragon from './../../assets/dragon.png'
import goblin from './../../assets/goblin.png'
import golem from './../../assets/golem.png'
import pekka from './../../assets/pekka.png'
import hogRider from './../../assets/hogRider.png'
import miner from './../../assets/miner.png'
import shooter from './../../assets/shooter.png'
import wizard from './../../assets/wizard.png'

import { withRouter, Redirect} from 'react-router-dom'

class GameBoardTwo extends Component {
    constructor(props) {
    super(props);
    this.state = {
    cards: [
        { name: 'archer', open: false, id: 1, image: archer, isCompleted: false },
        { name: 'archer', open: false, id: 2, image: archer, isCompleted: false },
        { name: 'barbar', open: false, id: 3, image: barbar, isCompleted: false },
        { name: 'barbar', open: false, id: 4, image: barbar, isCompleted: false },
        { name: 'dragon', open: false, id: 5, image: dragon, isCompleted: false },
        { name: 'dragon', open: false, id: 6, image: dragon, isCompleted: false },
        { name: 'goblin', open: false, id: 7, image: goblin, isCompleted: false },
        { name: 'goblin', open: false, id: 8, image: goblin, isCompleted: false },
        { name: 'golem', open: false, id: 9, image: golem, isCompleted: false },
        { name: 'golem', open: false, id: 10, image: golem, isCompleted: false },
        { name: 'pekka', open: false, id: 11, image: pekka, isCompleted: false },
        { name: 'pekka', open: false, id: 12, image: pekka, isCompleted: false },
        { name: 'hogRider', open: false, id: 13, image: hogRider, isCompleted: false },
        { name: 'hogRider', open: false, id: 14, image: hogRider, isCompleted: false },
        { name: 'miner', open: false, id: 15, image: miner, isCompleted: false },
        { name: 'miner', open: false, id: 16, image: miner, isCompleted: false },
        { name: 'shooter', open: false, id: 17, image: shooter, isCompleted: false },
        { name: 'shooter', open: false, id: 18, image: shooter, isCompleted: false },
        { name: 'wizard', open: false, id: 19, image: wizard, isCompleted: false },
        { name: 'wizard', open: false, id: 20, image: wizard, isCompleted: false }     
    ],
    shuffledCards: [],
    matchedCards: [],
    flippedCards: [],
    level: 1,
    score: 25,
    highScore: 0
}
}

    componentDidMount () {
        this.props.location.level && this.setState({ level: this.props.location.level})
        this.props.location.score && this.setState({ score: this.props.location.score})
        setTimeout ( () => { 
            if (this.state.level === 1 )
            this.setState({ shuffledCards: shuffle(this.state.cards.slice(0, 6)) })
        else if (this.state.level === 2)
            this.setState({ shuffledCards: shuffle(this.state.cards.slice(0, 12)) })
        else 
            this.setState({ shuffledCards: shuffle(this.state.cards) })


        },250)

    }

    onClickHandler = (troop, index) => {
        if (this.state.flippedCards.length !== 2) {
            let tempFlipped = this.state.flippedCards;
            let tempShuffled = this.state.shuffledCards;
            tempShuffled[index].open = true;
            tempFlipped.push(troop)
            this.setState ({ flippedCards: tempFlipped,shuffledCards: tempShuffled })
            if (this.state.flippedCards.length === 2) {
                setTimeout (() => {
                    this.check();
                },500)
            }
        } else {
            setTimeout (() => {
                this.check();
            },250)
        }

    }

    check = () => {
        let tempShuffled = this.state.shuffledCards;
        let tempMatched = this.state.matchedCards;
        let tempCards = this.state.cards;

        if (this.state.flippedCards[0].name === this.state.flippedCards[1].name) {
            tempShuffled.find( item => item.id === this.state.flippedCards[0].id).isCompleted = true
            tempShuffled.find( item => item.id === this.state.flippedCards[1].id).isCompleted = true
            tempMatched.push(this.state.flippedCards[0].id, this.state.flippedCards[1].id )
        }
        else {
            tempShuffled.find( item => item.id === this.state.flippedCards[0].id).open = false
            tempShuffled.find( item => item.id === this.state.flippedCards[1].id).open = false
            this.setState({ score: this.state.score - 1 })
        }
        this.setState ({
            flippedCards: [],
            matchedCards: tempMatched,
            shuffledCards: tempShuffled
        })
        if ( (this.state.matchedCards.length === 6 && this.state.level === 1) ||
             (this.state.matchedCards.length === 12 && this.state.level === 2) ||
             (this.state.matchedCards.length === 20 && this.state.level === 3)
            ) {
            tempCards.forEach(item => item.open === true ? item.open = false: item.open=false)
            this.setState({ 
                level: this.state.level+1,
                matchedCards: [],
                shuffledCards: [],
                cards: tempCards
            })
            
        }
    }
    
    render() {
        if( (this.state.matchedCards.length === 6 && this.state.level === 1) || 
            (this.state.matchedCards.length === 12 && this.state.level === 2) || 
            (this.state.matchedCards.length === 20 && this.state.level === 3) || 
            this.state.score === 0){
            const newTo = { 
                pathname: "", 
                userName: this.props.location.userName,
                score: this.state.score,
                level: this.state.level,
                highScore: this.state.highScore
              };
              ((this.state.matchedCards.length === 6 && this.state.level === 1) ||
              (this.state.matchedCards.length === 12 && this.state.level === 2) ||
              (this.state.matchedCards.length === 20 && this.state.level === 3) ) ? 
                newTo.pathname = "/result" : newTo.pathname = "/result"
            return <Redirect to={newTo} />
        }
        return (
            <div className="game">
            <div className="wooden-text">
                <div>Hi {this.props.location.userName}</div>
                <div>Your Score: {this.state.score}</div> 
            </div>
            <div className={
                this.state.level === 1 ? 
                    "game-board-one" :
                    this.state.level === 2 ?
                        "game-board-two" : "game-board-three"
            }>
                {this.state.shuffledCards.map ((troop, index) => 
                    <Card
                        key = {index}
                        onClickHandler={ () => this.state.flippedCards.length === 2 ? 
                            null: 
                            this.onClickHandler(troop, index)
                        }
                        troop = {troop}
                    />
                )}
            </div> 
            </div>
        )
    }
}

export default withRouter(GameBoardTwo)