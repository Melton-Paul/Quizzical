import React from "react"
import Start from "./components/Start"
import Question from "./components/Question"
import blob1 from "./images/blob1.png"
import blob2 from "./images/blob2.png"


export default function App(){
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [quizOver, setQuizOver] = React.useState(false)
  const [answeredQuestions, setAnsweredQuestions] = React.useState(0)
  const [points, setPoints] = React.useState(0)
  
  React.useEffect(()=> {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data => {
      console.log(data.results)
      let fixedIncorrect
      const fixedHtml = data.results.map(item => {
        fixedIncorrect = item.incorrect_answers.map(answer => {
          return  decodeHtml(answer)
        })
        return {...item, question: decodeHtml(item.question), correct_answer: decodeHtml(item.correct_answer), incorrect_answers: fixedIncorrect}
      })
      setQuestions(fixedHtml)
    })
  }, [])

  function startQuiz(){
    setQuizStarted(true)
  }

  function finishQuiz(){
    if(answeredQuestions === 5){
    setQuizOver(true)} 
  }

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

 
  
  const questionsHtml = questions.map(item => {
    const answersArr= [...item.incorrect_answers, item.correct_answer]
    const randomizedArr= []
    for(var i = answersArr.length-1; i >= 0; i--){
        const answer = answersArr.splice(Math.floor(Math.random()*answersArr.length), 1)
        randomizedArr.push({answer: answer, clicked: false, id: i})
      } 
    return <Question question={item.question} quizOver={quizOver} randomizedArr={randomizedArr} correct={item.correct_answer} setPoints={setPoints} setAnsweredQuestions={setAnsweredQuestions}  id={"question" + questions.indexOf(item)} key={questions.indexOf(item)}  />
  })

  return (
    <div className="container">
      <img className="start--top-img" src={blob1} alt="" />
      <img className="start--bottom-img" src={blob2} alt=""/>
      {!quizStarted ? <Start startQuiz={startQuiz} /> : 
      <form className="questions__container">
        <h1>Quizzical</h1>
        {questionsHtml}
      {!quizOver ? <button type="button" className="btn btn--secondary submit" onClick={finishQuiz}>Submit Answers</button>: 
      <button type="button" className="btn btn--secondary submit" onClick={()=>window.location.reload()}>Try Again</button>}
      {quizOver && <div className="score">You scored {points} points out of 5 points!</div> }
      </form>}
    </div>
  )
}