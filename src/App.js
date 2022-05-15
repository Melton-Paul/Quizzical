import React from "react"
import Start from "./components/Start"
import Question from "./components/Question"


export default function App(){
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [quizOver, setQuizOver] = React.useState(false)
  const [points, setPoints] = React.useState(0)
  function startQuiz(){
    setQuizStarted(true)
  }

  function finishQuiz(){
    setQuizOver(true)
    console.log("clicked")

  }


  // function checkAnswers(point){
  //   setPoints
  // }


  
  React.useEffect(()=> {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
      setQuestions(data.results)
    })
  }, [])
  
  
  const questionsHtml = questions.map(item => {
    const answersArr= [...item.incorrect_answers, item.correct_answer]
    const randomizedArr= []
    for(var i = answersArr.length-1; i >= 0; i--){
        const answer = answersArr.splice(Math.floor(Math.random()*answersArr.length), 1)
        randomizedArr.push({answer: answer, clicked: false, id: i})
      } 
    return <Question question={item.question} quizOver={quizOver} randomizedArr={randomizedArr} correct={item.correct_answer} setPoints={setPoints}  id={"question" + questions.indexOf(item)}  />
  })

  return (
    <div className="container">
      {!quizStarted && <Start startQuiz={startQuiz} />}
      <form className="questions__container">
        {questionsHtml}
      <button type="button" className="btn btn--secondary" onClick={finishQuiz}>Submit Answers</button>
      </form>
      {quizOver && <div>You scored {points} points out of 5 points!</div> }
    </div>
  )
}