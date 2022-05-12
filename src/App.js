import React from "react"
import Start from "./components/Start"
import Question from "./components/Question"


export default function App(){
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  function startQuiz(){
    setQuizStarted(true)
  }
  React.useEffect(()=> {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results)
      })
  }, [])


  const questionsHtml = questions.map(item => {
    return <Question question={item.question} />
  })

  return (
    <div className="container">
      {!quizStarted && <Start startQuiz={startQuiz} />}
      <div className="questions__container">
        {questionsHtml}
      </div>
    </div>
  )
}