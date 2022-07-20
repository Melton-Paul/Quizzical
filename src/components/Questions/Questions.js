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
  const [quizReset, setQuizReset] = React.useState(false);
  const [questionsHtml, setQuestionsHtml] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        let fixedIncorrect;
        const fixedHtml = data.results.map((item) => {
          fixedIncorrect = item.incorrect_answers.map((answer) => {
            return decodeHtml(answer);
          });
          return {
            question: decodeHtml(item.question),
            correct_answer: decodeHtml(item.correct_answer),
            incorrect_answers: fixedIncorrect,
          };
        });
        setQuestions(fixedHtml);
        setIsLoading(false);
      });
  }, [quizReset]);

  React.useEffect(() => {
    setQuizReset(false);
    setQuestionsHtml(
      questions.map((item) => {
        return (
          <Question
            question={item.question}
            quizOver={quizOver}
            incorrect_answers={item.incorrect_answers}
            correct_answer={item.correct_answer}
            correct={item.correct_answer}
            setPoints={setPoints}
            id={"question" + questions.indexOf(item)}
            key={questions.indexOf(item)}
          />
        );
      })
    );
  }, [questions, quizOver]);

  function finishQuiz() {
    setQuizOver(true);
  }

  function resetQuiz() {
    setPoints(0);
    setQuizOver(false);
    setQuizReset(true);
  }

  return (
    <>
      {!isLoading ? (
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
              onClick={resetQuiz}
            >
              Try Again
            </button>
          )}
          {quizOver && (
            <div className="score">
              You scored {points} points out of 5 points!
            </div>
          )}
        </form>
      ) : (
        <p>loading</p>
      )}
    </>
  );
}
