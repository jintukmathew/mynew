import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  './GameBoard.css';
import EachCell from '../EachCell';
import BoardHint from '../BoardHint';

class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      diamondSelections: [],
      selections: [],
    };
  }

  componentWillMount() {
    const { row } = this.props;
    this.setState({
      cellsArray: this.generateCellsArray(row),
      diamonds: this.generateDiamondPositions(row),
    });
  }

  componentDidMount = () => {
    this.props.componentMethods({
      restartGame: this.restartGame,
    });
  };

  componentWillUnMount = () => {
    this.props.componentMethods(null);
  };

  restartGame = () => {
    const { row } = this.props;
    this.setState({
      diamonds: this.generateDiamondPositions(row),
      diamondSelections: [],
      selections: [],
      currentCell: null,
    });
  };


  generateCellsArray = row => {
    const limit = row * row;
    const cellsArray = [];
    for (let i = 1; i <= limit; i += 1) {
      cellsArray.push(i);
    }
    return cellsArray;
  };

  generateDiamondPositions = row => {
    const diamonds = [];
    const min = 1;
    const max = row * row;
    while (diamonds.length < row) {
      const randomNumber = Math.floor(Math.random() * (max - 1)) + min;
      if (diamonds.indexOf(randomNumber) === -1) {
        diamonds.push(randomNumber);
      }
    }
    return diamonds;
  };

  handleDiamondSelection = cell => {
    const { row, onGameOver } = this.props;
    this.setState(
      {
        diamondSelections: [...this.state.diamondSelections, cell],
      },
      () => {
        if (this.state.diamondSelections.length === row) {
          onGameOver(
            this.state.cellsArray.length - this.state.selections.length,
          );
        }
      },
    );
  };

  handleSelection = cell => {
    this.setState(
      {
        selections: [...this.state.selections, cell],
        currentCell: cell,
      }
    );
  };


  render() {
    const { row } = this.props;
    const selections = this.state.selections;
    return (
      <section className="board">
        {this.state.cellsArray.map(key => (
          <EachCell 
          key={key}
          cellPosition={key}
          row={row}
          open={this.state.selections.indexOf(key) > -1}
          diamond={this.state.diamonds.indexOf(key) > -1}
          onDiamondSelection={this.handleDiamondSelection}
          onSelection={this.handleSelection}
        >
          { this.state.currentCell === key &&
            this.state.diamondSelections.indexOf(key) === -1 &&
            <BoardHint
              row={row}
              diamonds={this.state.diamonds.filter(x =>
                this.state.diamondSelections.indexOf(x) === -1)
              }
              currentCell={this.state.currentCell}
            />
          }
          </EachCell>
          ))
        }
      </section>
    );
  }
}

GameBoard.defaultProps = {
  componentMethods: () => {},
};

GameBoard.propTypes = {
  row: PropTypes.number.isRequired,
  onGameOver: PropTypes.func.isRequired,
  componentMethods: PropTypes.func,
};

export default GameBoard;
