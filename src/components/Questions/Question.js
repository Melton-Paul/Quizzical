import React, { useEffect } from "react";

export default function Question(props) {
  const [answers, setAnswers] = React.useState([]);
  const { quizOver, setPoints, correct, incorrect_answers, correct_answer } =
    props;
  const [answer, setAnswer] = React.useState("");

  useEffect(() => {
    console.log("Randomizer Ran");
    const arr = [...incorrect_answers, correct_answer];
    setAnswers([]);

    for (var i = arr.length - 1; i >= 0; i--) {
      const id = i;
      const answer = arr.splice(Math.floor(Math.random() * arr.length), 1);
      setAnswers((prev) => [...prev, { answer: answer, id: id }]);
    }
  }, [incorrect_answers, correct_answer]);

  console.log(answers);

  function handleChange(e) {
    setAnswer(e.target.value);
  }

  useEffect(() => {
    if (!quizOver) {
      return;
    }
    if (!answer) {
      return;
    }
    const selected = answers.filter((item) => item.answer[0] === answer);
    const ans = selected[0].answer[0];
    if (ans === correct) {
      setPoints((prev) => (prev = prev + 1));
    }
  }, [quizOver, answers, correct, setPoints, answer]);

  const answerHtml = answers.map((item) => {
    let styles;
    if (props.quizOver) {
      if (item.answer[0] === answer) {
        styles = {
          backgroundColor:
            item.answer[0] !== props.correct ? "pink" : "#1BE46F",
          opacity: item.answer[0] !== props.correct ? 0.7 : 0.9,
        };
      } else {
        styles = {
          opacity: 0.7,
        };
        if (item.answer[0] === props.correct)
          styles = {
            backgroundColor: "lightgreen",
          };
      }
    } else {
      styles = {
        backgroundColor: item.answer[0] === answer ? "#4d5b9e" : "white",
        color: item.answer[0] === answer ? "white" : "#4d5b9e",
      };
    }

    return (
      <label className="answer" style={styles} key={item.id}>
        <input
          type="radio"
          value={item.answer[0]}
          checked={answer === item.answer[0]}
          className="btn btn--primary"
          name={props.id}
          onChange={handleChange}
        />
        {item.answer}
      </label>
    );
  });

  return (
    <div className="question">
      <h2 className="question__title">{props.question}</h2>
      <div className="question--answers">{answerHtml}</div>
      {quizOver && !answer && (
        <p>You did not answer this question, automatically scored a zero.</p>
      )}
      <hr />
    </div>
  );
}
