import { useState } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState("25:00");

  function handleResetClock() {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft("25:00");
  }
  function handleClockLengths(e) {
    switch (e.target.id) {
      case "break-decrement":
        setBreakLength((oldValue) =>
          oldValue <= 1 ? oldValue : (oldValue -= 1)
        );
        break;
      case "break-increment":
        setBreakLength((oldValue) =>
          oldValue >= 60 ? oldValue : (oldValue += 1)
        );
        break;
      case "session-decrement":
        setSessionLength((oldValue) =>
          oldValue <= 1 ? oldValue : (oldValue -= 1)
        );
        break;
      case "session-increment":
        setSessionLength((oldValue) =>
          oldValue >= 60 ? oldValue : (oldValue += 1)
        );
        break;
    }
  }
  return (
    <main className="container">
      <h1>25 + 5 Clock</h1>

      <div className="controls">
        <div>
          <p id="break-label">Break Length</p>
          <div className="mini-control">
            <button onClick={handleClockLengths} id="break-decrement">
              abajo
            </button>
            <p id="break-length">{breakLength}</p>
            <button onClick={handleClockLengths} id="break-increment">
              arriba
            </button>
          </div>
        </div>

        <div>
          <p id="session-label">Session Length</p>
          <div className="mini-control">
            <button onClick={handleClockLengths} id="session-decrement">
              abajo
            </button>
            <p id="session-length">{sessionLength}</p>
            <button onClick={handleClockLengths} id="session-increment">
              arriba
            </button>
          </div>
        </div>
      </div>

      <div className="display">
        <h2 id="timer-label">Session</h2>
        <p id="time-left">{timeLeft}</p>
        <div className="display-controls">
          <button id="start_stop">start</button>
          <button onClick={handleResetClock} id="reset">
            reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
