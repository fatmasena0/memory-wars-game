import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './Result.scss'

class Result extends Component {
  render () {
    const { level, userName, score } = this.props.location
    if (this.props.location.level === 3) {
      this.props.location.player = { name: userName, score: score }
      localStorage.setItem('player', JSON.stringify(this.props.location.player))
      let scoreTable = []
      const tempPlayer = JSON.parse(localStorage.getItem('player'))
      if (JSON.parse(localStorage.getItem('scoreTable'))) {
        console.warn('geldi')
        scoreTable = JSON.parse(localStorage.getItem('scoreTable'))
        if (scoreTable.length === 1) {
            if (!(scoreTable[0].name === tempPlayer.name && scoreTable[0].score === tempPlayer.score)) {
                scoreTable.push(tempPlayer)
            }
        } else if (scoreTable.length === 2) {
            if (!(scoreTable[0].name === tempPlayer.name && scoreTable[0].score === tempPlayer.score) &&
            !(scoreTable[1].name === tempPlayer.name && scoreTable[1].score === tempPlayer.score)) {
                scoreTable.push(tempPlayer)
            }
        } else if (scoreTable.length === 3) {
            if (!(scoreTable[0].name === tempPlayer.name && scoreTable[0].score === tempPlayer.score) &&
            !(scoreTable[1].name === tempPlayer.name && scoreTable[1].score === tempPlayer.score) &&
            !(scoreTable[2].name === tempPlayer.name && scoreTable[2].score === tempPlayer.score)
             ) {
                scoreTable.push(tempPlayer)
        }        
    }

        if (scoreTable.length === 4) {
          scoreTable.sort((a, b) => { return b.score - a.score }).pop()
        }
        localStorage.setItem('scoreTable', JSON.stringify(scoreTable))
      } else {
        scoreTable.push(tempPlayer)
        localStorage.setItem('scoreTable', JSON.stringify(scoreTable))
      }
    }


    return (
      <div className='result'>
        {(this.props.location.score === 0)
          ? <div className='wooden-text'>
            <h2>Game Over</h2>
            <Link to={{ pathname: '/home' }}>Try Again </Link>
          </div>
          : (this.props.location.level < 3 && this.props.location.score !== 0)
              ? <div className='next-level'>
                <div className='wooden-text'>
                  <h4>Level {level} completed! </h4>
                  <Link to={{
                        pathname: '/game',
                        userName: this.props.location.userName,
                        score: this.props.location.score,
                        level: this.props.location.level + 1
                      }}
                      ><h3> NEXT LEVEL </h3>
                      </Link>
                </div>
              </div>
              :                (JSON.parse(localStorage.getItem('scoreTable'))) 
                ? <div className='wooden-text'>

                      <div>High Scores</div>
                  {
                            JSON.parse(localStorage.getItem('scoreTable'))
                              .sort((a, b) => { return b.score - a.score })
                              .map((item, index) =>
                              <table className='table'>
                              <tr>
                              <th>
                                  {index + 1}
                                </th>
                              <th>
                                  {item.name}
                                </th>
                              <th>
                                  {item.score}
                                </th>
                            </tr>
                            </table>
                              ) 
                    }


                  <Link to={{ pathname: '/home', highScore: this.props.location.highScore }}>Play Again </Link>

                </div>  
                : 
                
                <div className='wooden-text'>
                    <div>Score Table</div>

                  <table className='table'>
                      <tr>
                          <th>
                              {JSON.parse(localStorage.getItem('player')).name}
                            </th>
                          <th>
                              {JSON.parse(localStorage.getItem('player')).score}
                            </th>
                        </tr>
                    </table>

                  <Link to={{ pathname: '/home', highScore: this.props.location.highScore }}>Play Again </Link>

                </div>}
      </div>

    )
  }
}

export default withRouter(Result)
