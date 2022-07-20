import React from "react";
import Start from "./components/Start";
import Questions from "./components/Questions/Questions";
import blob1 from "./images/blob1.png";
import blob2 from "./images/blob2.png";

export default function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);

  function startQuiz() {
    setQuizStarted(true);
  }

  return (
    <div className="container">
      <img className="start--top-img" src={blob1} alt="" />
      <img className="start--bottom-img" src={blob2} alt="" />
      {!quizStarted ? <Start startQuiz={startQuiz} /> : <Questions />}
    </div>
  );
}
