import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import diamondImage from './images/diamond.png';

class Cell extends Component {
  handleClick = () => {
    const { open, cellPosition, diamond, onSelection, onDiamondSelection } = this.props;
    if (open === false) {
      if (diamond) {
        onDiamondSelection(cellPosition);
      }
      onSelection(cellPosition);
    }
  }

  render() {
    const { open, diamond } = this.props;
    return (
      <div
        className="cell"
        style={{ width: 'calc(12%)', height: '6vw', maxHeight: '12vh' }}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
      >
        { !open &&
          <div className="cover">?</div>
        }
        { open && diamond &&
          <div className="diamond"><img src={diamondImage} alt="Diamond" /></div>
        }
        { this.props.children }
      </div>
    );
  }
}

Cell.defaultProps = {
  diamond: false,
  children: null,
};

Cell.propTypes = {
  diamond: PropTypes.bool,
  cellPosition: PropTypes.number.isRequired,
  onSelection: PropTypes.func.isRequired,
  onDiamondSelection: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Cell;
