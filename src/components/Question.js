import React, { useEffect } from "react"

export default function Question(props){
    // const answersArr= [...props.incorrect, props.correct]
    // const randomizedArr= []
    // for(var i = answersArr.length-1; i >= 0; i--){
    //     const answer = answersArr.splice(Math.floor(Math.random()*answersArr.length), 1)
    //     randomizedArr.push({answer: answer, clicked: false, id: i})
    //   } 
    const [answers, setAnswers] = React.useState(props.randomizedArr) 
    const [answered, setAnswered] = React.useState(false)
    const id = props.id
    console.log(id)
    function handleChange(id){
        setAnswers(prev => {
           return prev.map(item => {
                return  item.id === id ? {...item, clicked: true}: {...item, clicked: false}
            })
        })

    }
   
   
    useEffect(()=>{
        if(props.quizOver){
        const selected = answers.filter(item => item.clicked)
        const ans = selected[0].answer[0]

        const points = ans === props.correct ? 1 : 0 
        props.setPoints(prev => prev + points)}
    }, [props.quizOver])



    const answerHtml = answers.map(item => {
        const styles = {
            backgroundColor: item.clicked? "pink" : "white"
        }
        return <label className="answer" style={styles} onChange={()=> handleChange(item.id)}><input type="radio" className="btn btn--primary" name={props.id} />{item.answer}</label> 
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