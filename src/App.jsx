import { useRef, useState } from "react";
import beep from "./beep.wav";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState("25:00");
  const [isStartClock, setIsStartClock] = useState(true);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isBreak, setIsBreak] = useState(false);

  const interval = useRef(null);
  const sessionLengthSeconds = useRef(sessionLength * 60);
  const audioRef = useRef(beep);

  function handleResetClock() {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft("25:00");
    sessionLengthSeconds.current = sessionLength * 60;
    setTimerLabel("Session");
    setIsBreak(false);
    clearInterval(interval.current);
    setIsStartClock(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
  function handleClockLengths(e) {
    let sesLong = sessionLength;
    const sesLongDecrement = sesLong <= 1 ? sesLong : sesLong - 1;
    const sesLongIncrement = sesLong >= 60 ? sesLong : sesLong + 1;

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
        setSessionLength(sesLongDecrement);
        setTimeLeft(
          sesLongDecrement < 10
            ? `0${sesLongDecrement}:00`
            : `${sesLongDecrement}:00`
        );
        break;
      case "session-increment":
        setSessionLength(sesLongIncrement);
        setTimeLeft(
          sesLongIncrement < 10
            ? `0${sesLongIncrement}:00`
            : `${sesLongIncrement}:00`
        );
        break;
    }
  }
  function startClock() {
    sessionLengthSeconds.current -= 1;

    let isBreakTrue = isBreak;

    interval.current = setInterval(function () {
      let min = Math.floor(sessionLengthSeconds.current / 60);
      let sec = sessionLengthSeconds.current % 60;
      if (min < 10) min = `0${min}`;
      if (sec < 10) sec = `0${sec}`;
      setTimeLeft(min + ":" + sec);
      sessionLengthSeconds.current -= 1;

      if (sessionLengthSeconds.current < 0 && !isBreakTrue) {
        audioRef.current.play();
        setTimerLabel("Break");
        setIsBreak(true);
        sessionLengthSeconds.current = breakLength * 60;
        isBreakTrue = true;
      }

      if (sessionLengthSeconds.current < 0 && isBreakTrue) {
        setTimerLabel("Session");
        setIsBreak(false);
        sessionLengthSeconds.current = sessionLength * 60;
        isBreakTrue = false;
      }
    }, 1000);
    setIsStartClock(false);
  }
  function stopClock() {
    sessionLengthSeconds.current -= 1;
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
      <audio ref={audioRef} id="beep" src={beep}></audio>
    </main>
  );
}
export default App;
