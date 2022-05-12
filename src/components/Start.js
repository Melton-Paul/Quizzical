import blob1 from "../images/blob1.png"
import blob2 from "../images/blob2.png"

export default function Start(props){
    return (
        <div className="block--start">
            <h1 className="start__title">Quizzical</h1>
            <p className="start__desc">Test your knowledge!</p>
            <button className="btn btn--secondary start__btn" onClick={props.startQuiz}>Start Quiz</button>
            <img className="start--top-img" src={blob1} />
            <img className="start--bottom-img" src={blob2} />
      </div>
    )
}