import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';
import { Redirect } from "react-router-dom";

export default class Quiz extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
         
         // initiating the local state
            this.state = {
                questions: [],
                answers: [],
                correctAnswers: [],
                attempt_question : [],
                correctAnswer: 0,
                clickedAnswer: 0,
                step: 1,
                score: 0
            }

            //bind functions
            this.checkAnswer = this.checkAnswer.bind(this);
            this.nextStep = this.nextStep.bind(this);
            this.previousStep = this.previousStep.bind(this);
            this.skipQuestion = this.skipQuestion.bind(this);
      }
   

    componentDidMount(){
        const {quiz_option} = this.props;
        fetch('quiz.json').then(this.handleResponse).then(res => {
            console.log(res)
            var get_quiz =  res.filter((res) => res.Id == quiz_option);
            if(get_quiz && get_quiz.length > 0){
                get_quiz = get_quiz[0];
                if(get_quiz){
                    const {questions,answers,correctAnswers} = get_quiz;
                    var attempt_question = [];
                    if(questions && Object.keys(questions).length > 0){
                        var i = 1;
                        for (const [key, value] of Object.entries(questions)) {
                            attempt_question.push({q_id:i,choose_option:''});
                            i++;
                        }
                    } 
                    this.setState({
                        questions,
                        answers,
                        correctAnswers,
                        attempt_question
                    })
                    this.props.handleLoading(false);
                }
            }
        })
    }


    handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            } 
            return data;
        });
    }

    // the method that checks the correct answer
    checkAnswer(answer){
        const { correctAnswers, step, score,attempt_question } = this.state;
        var attempt_q = attempt_question;
            attempt_question.map((d,i) => {
                if(step == d.q_id){
                    attempt_q[i].choose_option = answer;
                    attempt_q[i].correct_option = correctAnswers[step];

                }
            })
        if(answer === correctAnswers[step]){
            

            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer,
                attempt_question : attempt_q
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer,
                attempt_question : attempt_q
            });
        }
    }

    // method to move to the next question
    nextStep(step) {
        const{attempt_question} = this.state;
        var choose_option = 0;
        attempt_question.map((d,i) => {
            if(d.q_id == (step + 1)){
                choose_option = d.choose_option;
            }
        })
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: choose_option
        });
         
    }

    // method to move to the previous question
    previousStep(step) {
        const {attempt_question} = this.state;
        var choose_option = 0;
        attempt_question.map((d,i) => {
            if(d.q_id == (step - 1)){
                choose_option = d.choose_option;
            }
        })
        this.setState({
            step: step - 1,
            correctAnswer: 0,
            clickedAnswer: choose_option
        });
    }

    //method to skip question
    skipQuestion(step){
        this.nextStep(step);
    }

    render(){
        let { questions, answers, correctAnswer, clickedAnswer, step, score, attempt_question } = this.state;
        const {isLoading, quiz_option} = this.props; 
        if(isLoading){
            return "Loading Quiz...";
        }
        return(
            <div className="Content">
                {step <= Object.keys(questions).length ? 
                    (<>
                        <h2>Question :  {step}</h2>
                        <Question
                            question={questions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <div className="row">
                        <div className="col-md-2">
                        {step > 1 ? 
                            <button
                            className="btn btn-warning" 
                            onClick={() => this.previousStep(step)}>Previous</button>:''
                        }
                        </div>
                        <div className="col-md-2">
                        <button
                        className="btn btn-primary"
                        disabled={
                            clickedAnswer == 0
                            ? true : false
                        }
                        onClick={() => this.nextStep(step)}>

                        {
                            step == Object.keys(questions).length ? 'Submit':'Next'
                        }
                            
                        </button>
                        </div>
                        <div className="col-md-2">
                            <button
                            className="btn btn-danger" 
                            onClick={() => this.skipQuestion(step)}>Skip</button> 
                        </div>

                        </div>
                    </>) : (
                        <Redirect
                            to={{
                            pathname: "/result",
                            state: { attempt_question: attempt_question,quiz_option }
                        }}
                        />
                    )
                }
            </div>
        );
    }
}