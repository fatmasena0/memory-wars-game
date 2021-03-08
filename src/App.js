import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./components/Home/Home"
import GameBoardTwo from "./components/GameBoardTwo/GameBoardTwo"
import Result from "./components/Result/Result"

const App = () => {
  return (
    <div className="App">
    <Router>
      <nav className="navbar">
        <div className="wooden-text">
          <div>Memory Wars</div>
        </div>      
      </nav>
        <Switch>
          <Route path="/game">
              <GameBoardTwo />
          </Route>
          <Route path="/result">
              <Result />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
    </div>
  )
}

export default App;
