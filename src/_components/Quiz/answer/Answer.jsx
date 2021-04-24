import React from 'react';
import './Answer.css';

const Answer = (props) => {
    let answers = Object.keys(props.answer)
        .map((qAnswer, i) => (
            <li
            // className=
            // {
            //     props.correctAnswer === qAnswer ?
            //     'list-group-item correct' : 
            //     props.clickedAnswer === qAnswer ? 
            //     'incorrect' : ''
            // }
            className={props.clickedAnswer === qAnswer ? 'list-group-item active':'list-group-item'}
            onClick={() => props.checkAnswer(qAnswer)}
            key={qAnswer}>
                {props.answer[qAnswer]}
            </li>
        ));

        return (
            <>
                <ul className="list-group" disabled={props.clickedAnswer ? true : false} className="Answers">
                    {answers}
                </ul> 
            </>
        );
}

export default Answer;