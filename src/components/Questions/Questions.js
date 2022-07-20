import React from "react";
import Question from "./Question";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function Questions(props) {
  const [questions, setQuestions] = React.useState([]);
  const [points, setPoints] = React.useState(0);
  const [quizOver, setQuizOver] = React.useState(false);
  const [answeredQuestions, setAnsweredQuestions] = React.useState(0);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        let fixedIncorrect;
        const fixedHtml = data.results.map((item) => {
          fixedIncorrect = item.incorrect_answers.map((answer) => {
            return decodeHtml(answer);
          });
          return {
            ...item,
            question: decodeHtml(item.question),
            correct_answer: decodeHtml(item.correct_answer),
            incorrect_answers: fixedIncorrect,
          };
        });
        setQuestions(fixedHtml);
      });
  }, []);

  function finishQuiz() {
    if (answeredQuestions === 5) {
      setQuizOver(true);
    }
  }

  const questionsHtml = questions.map((item) => {
    const answersArr = [...item.incorrect_answers, item.correct_answer];
    const randomizedArr = [];
    for (var i = answersArr.length - 1; i >= 0; i--) {
      const answer = answersArr.splice(
        Math.floor(Math.random() * answersArr.length),
        1
      );
      randomizedArr.push({ answer: answer, clicked: false, id: i });
    }
    return (
      <Question
        question={item.question}
        quizOver={quizOver}
        randomizedArr={randomizedArr}
        correct={item.correct_answer}
        setPoints={setPoints}
        setAnsweredQuestions={setAnsweredQuestions}
        id={"question" + questions.indexOf(item)}
        key={questions.indexOf(item)}
      />
    );
  });

  return (
    <form className="questions__container">
      <div className="title">
        <h1>Quizzical</h1>
        <div className="title--line"></div>
      </div>
      {questionsHtml}
      {!quizOver ? (
        <button
          type="button"
          className="btn btn--secondary submit"
          onClick={finishQuiz}
        >
          Submit Answers
        </button>
      ) : (
        <button
          type="button"
          className="btn btn--secondary submit"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      )}
      {quizOver && (
        <div className="score">You scored {points} points out of 5 points!</div>
      )}
    </form>
  );
}
