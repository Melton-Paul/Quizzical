import React from "react"
import Start from "./components/Start"


export default function App(){
  const [quizStarted, setQuizStarted] = React.useState(false)
  
  function startQuiz(){
    setQuizStarted(true)
  }


  return (
    <div className="container">
    {!quizStarted && <Start startQuiz={startQuiz} />}
      <h1>Test</h1>

    </div>
  )
}