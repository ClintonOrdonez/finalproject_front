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
  let winner = null;

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

  // console.log(winner);

  return winner;
};

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      squares: Array(9).fill(null),
      updateStats: false
    };
  }

  handleClick = squareNum => {
    // console.log(squareNum);
    let currentSquares = this.state.squares;
    if (currentSquares[squareNum] || checkWinner(currentSquares)) {
      return;
    }
    currentSquares[squareNum] = this.state.xIsNext ? "X" : "O";
    this.setState({
      square: currentSquares,
      xIsNext: !this.state.xIsNext
    });
  };

  handleUpdateStats = () => {
    this.setState({
      updateStats: true
    });
  };

  updateStats = (winner, email, games, xWins, oWins, draws) => {
    if (this.state.updateStats === false) {
      if (winner === "X") {
        games++;
        xWins++;
        this.props.onUpdateTicTacToeStats(email, games, xWins, oWins, draws);
        this.handleUpdateStats();
      }
      if (winner === "O") {
        games++;
        oWins++;
        this.props.onUpdateTicTacToeStats(email, games, xWins, oWins, draws);
        this.handleUpdateStats();
      }
      if (winner === "Draw") {
        games++;
        draws++;
        this.props.onUpdateTicTacToeStats(email, games, xWins, oWins, draws);
        this.handleUpdateStats();
      }
    }
  };

  renderSquare = squareNum => (
    <Square
      val={this.state.squares[squareNum]}
      onClick={() => this.handleClick(squareNum)}
    />
  );

  render() {
    let winner = checkWinner(this.state.squares);
    let email = this.props.email;
    let games = this.props.ticTacToeStats.games;
    let xWins = this.props.ticTacToeStats.xWins;
    let oWins = this.props.ticTacToeStats.oWins;
    let draws = this.props.ticTacToeStats.draws;

    this.updateStats(winner, email, games, xWins, oWins, draws);

    return (
      <div>
        <div className="jumbotron">
          <div className="form-group">
            <h1>Tic-Tac-Toe</h1>
            {this.state.updateStats === false && (
              <h3>Turn: {this.state.xIsNext ? "X" : "O"}</h3>
            )}
            {this.state.updateStats === true && <h3>Game Over!</h3>}
            <h5>Winner:</h5>
            <h2>&nbsp;{winner}&nbsp;</h2>
          </div>

          <br />

          <div className="flex-container">
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
          </div>

          <br />

          <div className="form-group">
            <h4>Stats for {email}:</h4>
            <span>[ Games: {games} ]</span>&nbsp;
            <span>[ X Wins: {xWins} ]</span>&nbsp;
            <span>[ O Wins: {oWins} ]</span>&nbsp;
            <span>[ Draws: {draws} ]</span>
            <br />
            <br />
            <ButtonGroup>
              <Button
                onClick={() => {
                  this.setState({
                    xIsNext: true,
                    squares: Array(9).fill(null),
                    updateStats: false
                  });
                }}
              >
                Reset Board
              </Button>
              <Button
                onClick={() => {
                  this.props.onUpdateTicTacToeStats(email, 0, 0, 0, 0);
                }}
              >
                Erase Stats
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
