import { useRef, useState } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(1);
  const [sessionLength, setSessionLength] = useState(1);
  const [timeLeft, setTimeLeft] = useState("25:00");
  const [isStartClock, setIsStartClock] = useState(true);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isBreak, setIsBreak] = useState(false);
  // console.log(isBreak);

  function handleResetClock() {
    setBreakLength(1);
    setSessionLength(1);
    setTimeLeft("25:00");
    sessionLengthSeconds.current = sessionLength * 60;
    setTimerLabel("Session");
    setIsBreak(false);
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

  const interval = useRef(null);
  const sessionLengthSeconds = useRef(null);
  function startClock() {
    sessionLengthSeconds.current = sessionLength * 60;
    let isBreakTrue = isBreak;

    interval.current = setInterval(function () {
      let min = Math.floor(sessionLengthSeconds.current / 60);
      let sec = sessionLengthSeconds.current % 60;
      setTimeLeft(min + ":" + sec);
      sessionLengthSeconds.current -= 1;

      if (sessionLengthSeconds.current < 0 && !isBreakTrue) {
        setTimerLabel("Break");
        setIsBreak(true);
        sessionLengthSeconds.current = breakLength * 60;
        isBreakTrue = true;
        console.log("cAmbio a break");
      }

      if (sessionLengthSeconds.current < 0 && isBreakTrue) {
        setTimerLabel("Session");
        setIsBreak(false);
        sessionLengthSeconds.current = sessionLength * 60;
        isBreakTrue = false;
        console.log("cAmbio a Session");
      }
    }, 1000);
    setIsStartClock(false);
  }

  function stopClock() {
    clearInterval(interval.current);
    setIsStartClock(true);
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
        <h2 id="timer-label">{timerLabel}</h2>
        <p id="time-left">{timeLeft}</p>
        <div className="display-controls">
          {isStartClock ? (
            <button onClick={startClock} id="start_stop">
              Start
            </button>
          ) : (
            <button onClick={stopClock} id="start_stop">
              Stop
            </button>
          )}
          <button onClick={handleResetClock} id="reset">
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
