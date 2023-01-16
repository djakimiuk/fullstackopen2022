import { useState } from "react";

const FeedbackHandle = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const FeedbackDisplay = ({ text, counter }) => {
  return (
    <>
      <p>
        {text} {counter}
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
      <FeedbackDisplay text="good" counter={good} />
      <FeedbackDisplay text="neutral" counter={neutral} />
      <FeedbackDisplay text="bad" counter={bad} />
    </div>
  );
};

export default App;
