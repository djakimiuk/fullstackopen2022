import { useState } from "react";

const FeedbackHandle = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const sumAll = good + neutral + bad;
  const average = (good - bad) / sumAll;
  const positive = (good / sumAll) * 100;
  if (sumAll === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <p>
        good {good}
        <br></br>
        neutral {neutral}
        <br></br>
        bad {bad}
        <br></br>
        all {sumAll}
        <br></br>
        average {average}
        <br></br>
        positive {positive} %
      </p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackHandle handleClick={() => setGood(good + 1)} text={"good"} />
      <FeedbackHandle
        handleClick={() => setNeutral(neutral + 1)}
        text={"neutral"}
      />
      <FeedbackHandle handleClick={() => setBad(bad + 1)} text={"bad"} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
