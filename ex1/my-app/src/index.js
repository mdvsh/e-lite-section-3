import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Converting Square React component into function component.

function Square(props) {
  const classN = "square" + (props.highlight ? ' win' : '');
  return (
    <button className={classN} 
    onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square 
      key={i}
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      highlight={this.props.winLine && this.props.winLine.includes(i)}
    />;
  }

  render() {
    const dimsBoard = 3
    let squares = []
    for (let i = 0; i < dimsBoard; i++) {
      let rows = []
      for (let j = 0; j < dimsBoard; j++) {
        rows.push(this.renderSquare(i*dimsBoard+j))
      }
      squares.push(
      <div key={i} className="board-row">{rows}</div>
      )
    }
    return (
      <div>{squares}</div>
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
      stepNum: 0,
      sortAsc: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNum + 1)
    const current  = history[history.length - 1]
    const squares = current.squares.slice()
    if (findWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.XisNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
        latestSquarePos: i
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

  handleSort() {
    this.setState({
      sortAsc: !this.state.sortAsc
    })
  }

  render() {

    const history = this.state.history
    const current = history[this.state.stepNum]
    const winnerInfo = findWinner(current.squares)
    const winner = winnerInfo.winner

    // Using the map method, we can map our history of moves to React elements representing
    // buttons on the screen, and display a list of buttons to “jump” to past moves.

    let moves = history.map((step, move) => {
      const r = 1 + Math.floor(step.latestSquarePos / 3)
      const c = 1 + step.latestSquarePos % 3
      const desc = move ? 
      `Go to Move #${move}: Col ${c}, Row ${r}` : 
      'Go to Game Start'
      return (
        <li key={move}>
          <button 
          className={move === this.state.stepNum ? 'moves-item-bold' : ''}
          onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    if (!this.state.sortAsc) {
      moves.reverse()
    }

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      if (winnerInfo.draw) {
        status = "It's a Draw!"
      }
      else {
        status = 'Next Player: ' + (this.state.XisNext ? 'X' : 'O')
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
            winLine = {winnerInfo.winLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div><br/>
          <button
          onClick = {() => this.handleSort()}>
          Sort: <b>{this.state.sortAsc ? 'Descending' : 'Ascending'}</b>
          </button>
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
      return {
        winner: squares[a],
        winLine: lines[i],
        draw: false
      }
    }
  }
  let drawB = true
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) { // check for free cells
      drawB = false
      break
    }
  }
  return {
    winner: null,
    winLine: null,
    draw: drawB
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

