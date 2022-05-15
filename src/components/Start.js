

export default function Start(props){
    return (
        <div className="block--start">
            <h1 className="start__title">Quizzical</h1>
            <p className="start__desc">Test your knowledge!</p>
            <button className="btn btn--secondary start__btn" onClick={props.startQuiz}>Start Quiz</button>
      </div>
    )
}