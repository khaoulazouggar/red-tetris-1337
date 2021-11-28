function Board(props) {
  // console.log(props.data.start)
  return (
    <div className="board">
      {[...Array(20)].map((col, key) => (
        <div className="row" key={key}>
          <div className="row">
            {[...Array(10)].map((col, key) => (
              <div className="col" key={key}></div>
            ))}
          </div>
        </div>
      ))}
      {props.data.start ? (
        <div className="overlay">
          <div className="overlay-content">
            <div id="key-up">
              <kbd className="key">up</kbd>
              <span>piece&nbsp; rotation</span>
            </div>
            <div id="key-down">
              <kbd className="key">down</kbd>
              <span>move&nbsp; piece&nbsp; down</span>
            </div>
            <div id="key-left">
              <kbd className="key">left</kbd>
              <span>move &nbsp;piece &nbsp;left</span>
            </div>
            <div id="key-right">
              <kbd className="key">right</kbd>
              <span>move &nbsp;piece&nbsp; right</span>
            </div>
            <div id="key-space">
              <kbd className="key">space</kbd>
              <span>hard &nbsp;drop</span>
            </div>
          </div>
          <h2 className="start-game">Press &nbsp;enter &nbsp;to &nbsp;start</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Board;