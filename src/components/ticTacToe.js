import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";
import { UserUpdateTicTacToeStats } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    email: state.email,
    ticTacToeStats: state.ticTacToeStats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTicTacToeStats: (email, games, xWins, oWins, draws) =>
      dispatch(UserUpdateTicTacToeStats(email, games, xWins, oWins, draws))
  };
};

const Square = props => (
  <button className="square" onClick={props.onClick}>
    {props.val}
  </button>
);

const checkWinner = (squares, props) => {
  console.log(props);
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
  let winner = null;
  // let email = props.email;
  // let games = props.games;
  // let xWins = props.xWins;
  // let oWins = props.oWins;
  // let draws = props.draws;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] !== null &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      winner = squares[a];
    }
  }

  if (winner === null && squares.includes(null) === false) {
    winner = "Draw";
  }

  // if (winner === "X") {
  //   games++;
  //   xWins++;
  //   props.onUpdateTicTacToeStats(email, games, xWins, oWins, draws);
  // }
  // if (winner === "O") {
  //   games++;
  //   oWins++;
  //   props.onUpdateTicTacToeStats(email, games, xWins, oWins, draws);
  // }
  // if (winner === "Draw") {
  //   games++;
  //   draws++;
  //   props.onUpdateTicTacToeStats(email, games, xWins, oWins, draws);
  // }

  return winner;
};

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      squares: Array(9).fill(null),
      update: false
    };
  }

  handleClick = squareNum => {
    // console.log(squareNum);
    let currentSquares = this.state.squares;
    if (currentSquares[squareNum] || checkWinner(currentSquares, this.props)) {
      return;
    }
    currentSquares[squareNum] = this.state.xIsNext ? "X" : "O";
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
    let winner = checkWinner(this.state.squares, this.props);
    let email = this.props.email;
    let games = this.props.ticTacToeStats.games;
    let xWins = this.props.ticTacToeStats.xWins;
    let oWins = this.props.ticTacToeStats.oWins;
    let draws = this.props.ticTacToeStats.draws;

    return (
      <div>
        <div className="jumbotron">
          <div className="form-group">
            <h1>Tic-Tac-Toe</h1>
            <h3>Turn: {this.state.xIsNext ? "X" : "O"}</h3>
            <h3>Winner: {winner}</h3>
          </div>
          <br />
          <div className="form-group">
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
          <br />
          <div className="form-group">
            <h3>Stats for {email}:</h3>
            <span>[ Games: {games} ]</span>&nbsp;
            <span>[ X Wins: {xWins} ]</span>&nbsp;
            <span>[ O Wins: {oWins} ]</span>&nbsp;
            <span>[ Draws: {draws} ]</span>
            <br />
            <br />
            <ButtonGroup>
              <Button
                onClick={() => {
                  if (winner === "X") {
                    games++;
                    xWins++;
                    this.props.onUpdateTicTacToeStats(
                      email,
                      games,
                      xWins,
                      oWins,
                      draws
                    );
                  }
                  if (winner === "O") {
                    games++;
                    oWins++;
                    this.props.onUpdateTicTacToeStats(
                      email,
                      games,
                      xWins,
                      oWins,
                      draws
                    );
                  }
                  if (winner === "Draw") {
                    games++;
                    draws++;
                    this.props.onUpdateTicTacToeStats(
                      email,
                      games,
                      xWins,
                      oWins,
                      draws
                    );
                  }
                }}
              >
                Recalculate Stats
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    xIsNext: true,
                    squares: Array(9).fill(null)
                  });
                }}
              >
                Reset Board
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToe);
