import React, { Component } from 'react';
import GameBoard from '../GameBoard';
import "./container.css"

class Container extends Component {
  constructor() {
    super();
    this.state = {
      gameOver: false,
    };
  }


  handleGameOver = score => {
    this.setState(
      {
        gameOver: true,
        score,
      },
    );
  };

  handleRestart = () => {
    this.boardMethods.restartGame();
    this.setState({
      gameOver: false,
    });
  };



  render() {
    return (
      <div className="game-wrapper">
        <GameBoard
          row={8}
          onGameOver={this.handleGameOver}
          componentMethods={methods => {
            this.boardMethods = methods;
          }}/>
        {this.state.gameOver && (
          <section className="game-results">
            <h1>Game Finished!</h1>
            <h2>Your Score: {this.state.score}</h2>
            <div>
              <button className="btn btn-restart" onClick={this.handleRestart}>
                Play And Break !!! :)
              </button>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Container;
