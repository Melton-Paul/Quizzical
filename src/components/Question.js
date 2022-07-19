import React, { useEffect } from "react";

export default function Question(props) {
  const [answers, setAnswers] = React.useState(props.randomizedArr);
  const [answered, setAnswered] = React.useState(0);
  const { quizOver, setPoints, correct } = props;

  function handleChange(id) {
    setAnswers((prev) => {
      return prev.map((item) => {
        return item.id === id
          ? { ...item, clicked: true }
          : { ...item, clicked: false };
      });
    });
    setAnswered((prev) => prev + 1);
    if (answered === 0) {
      props.setAnsweredQuestions((prev) => prev + 1);
    }
  }

  useEffect(() => {
    const selected = answers.filter((item) => item.clicked);
    if (quizOver) {
      const ans = selected[0].answer[0];
      const points = ans === correct ? 1 : 0;
      setPoints((prev) => prev + points);
    }
  }, [quizOver, answers, setPoints, correct]);

  const answerHtml = answers.map((item) => {
    let styles;
    if (props.quizOver) {
      if (item.clicked) {
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
        backgroundColor: item.clicked ? "#4d5b9e" : "white",
        color: item.clicked ? "white" : "#4d5b9e",
      };
    }
    return (
      <label
        className="answer"
        style={styles}
        key={item.id}
        onChange={
          props.quizOver === false ? () => handleChange(item.id) : () => {}
        }
      >
        {" "}
        <input type="radio" className="btn btn--primary" name={props.id} />{" "}
        {item.answer}{" "}
      </label>
    );
  });

  return (
    <div className="question">
      <h2 className="question__title">{props.question}</h2>
      <div className="question--answers">{answerHtml}</div>
      <hr />
    </div>
  );
}
