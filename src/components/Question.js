export default function Question(props){
    return (
        <div className="question">
            <h2 className="question__title">{props.question}</h2>
            <div className="question--answers">
                <button className="btn btn--primary answer">ANSWER</button>
                <button className="btn btn--primary answer">ANSWER</button>
                <button className="btn btn--primary answer">ANSWER</button>
                <button className="btn btn--primary answer">ANSWER</button>
            </div>
            <hr/>
        </div>
    )
}