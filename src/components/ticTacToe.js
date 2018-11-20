import React, { Component } from "react";

const Square = props => (
  <button className="square" onClick={props.onClick}>
    {props.val}
  </button>
);

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      squares: Array(9).fill(null)
    };
  }

  handleClick = squareNum => {
    console.log(squareNum);
    let currentSquares = this.state.squares;
    if (currentSquares[squareNum] || checkWinner(currentSquares)) {
      return;
    }
    currentSquares[squareNum] = this.state.xIsNext ? " X " : " O ";
    this.setState({
      square: currentSquares,
      xIsNext: !this.state.xIsNext
    });
  };

  renderSquare = squareNum => (
    <Square
      val={this.state.squares[squareNum]}
      onClick={() => this.handleClick(squareNum)}
    />
  );

  render() {
    let winner = checkWinner(this.state.squares);

    return (
      <div>
        <div className="jumbotron">
          <h1>Tic-Tac-Toe</h1>
          <h3>Turn: {this.state.xIsNext ? " X " : " O "}</h3>
          <h3>Winner: {winner}</h3>
          <div className="row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

const checkWinner = squares => {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
