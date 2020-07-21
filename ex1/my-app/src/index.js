import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Converting Square React component into function component.

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

// We’ll want the top-level Game component to display a list of past moves.
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      XisNext: true,
      stepNum: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNum + 1)
    const current  = history[history.length - 1]
    const squares = current.squares.slice()
    if (findWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.XisNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      XisNext: !this.state.XisNext,
      stepNum: history.length
    })
  }

  jumpTo(step) {
    this.setState({
      stepNum: step,
      XisNext: (step % 2) === 0
    })
  }

  render() {

    const history = this.state.history
    const current = history[this.state.stepNum]
    const winner = findWinner(current.squares)

    // Using the map method, we can map our history of moves to React elements representing
    // buttons on the screen, and display a list of buttons to “jump” to past moves.

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to Move #' + move : 'Go to Game Start.'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next Player: ' + (this.state.XisNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares= {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function findWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

