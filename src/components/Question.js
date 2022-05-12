export default function Question(props){
    const answersArr= [...props.incorrect, props.correct]
    const randomizedArr= []
    for(var i = answersArr.length-1; i >= 0; i--){
        randomizedArr.push(answersArr.splice(Math.floor(Math.random()*answersArr.length), 1))

      }
    const answerHtml = randomizedArr.map(item => {
        return <button className="btn btn--primary answer">{item}</button>
    })

    return (
        <div className="question">
            <h2 className="question__title">{props.question}</h2>
            <div className="question--answers">
                {answerHtml}
            </div>
            <hr/>
        </div>
    )
}