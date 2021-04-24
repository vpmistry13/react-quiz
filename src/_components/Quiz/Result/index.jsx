import React, {Component} from 'react'; 
import { Link, Redirect } from "react-router-dom";

class Result extends Component {

    constructor(props) {
        super(props); 
      }

    componentDidMount() {
        //store result in localStorage
        const{ state } = this.props.location;
         if(state){
            const{ attempt_question,quiz_option } = state;
            //store attempt question
            localStorage.setItem('attempt_question',JSON.stringify(attempt_question));
            //store last quiz option
            localStorage.setItem('quiz_option',quiz_option);
         }
    }
 
  

    render() {
        ///getting this data from previous route state 
        const{ state } = this.props.location;
         if(state){
            const{ attempt_question,quiz_option } = state;
        var total_score = 0; 
        if(attempt_question && attempt_question.length > 0){
            attempt_question.map((d) => {
                if(d.correct_option == d.choose_option){
                    total_score++;
                }
            })
            return (
                <section className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                    <div id="result-of-question" className="pulse animated" >
                            <h2 className="pull-right">Total correct: <strong>{total_score}</strong></h2>
                            <table className="table table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <th>Question No.</th>
                                        <th>Our answer</th>
                                        <th>Your answer</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    attempt_question.map((d,i) => {
                                        const{correct_option,choose_option,q_id} = d;
                                        return(<tr key={i}>
                                            <td>{q_id}</td>
                                            <td>{correct_option}</td>
                                            <td>{choose_option}</td>
                                            <td>{correct_option == choose_option ? 'Correct':
                                            choose_option == '' ?
                                            'Not attempt':'Incorrect'
                                            }</td>
                                        </tr>)
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <div  className="row">
                            <div className="col-md-3"> 
                                <Link className="btn btn-danger" to={ { pathname: '/',quiz_option }}
                                    > Restart Quiz</Link>
                            </div>
                            <div className="col-md-3">
                                <Link className="btn btn-primary" to={ { pathname: '/' }}
                                    > Start New Quiz</Link>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }else{
            return(
                <section className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    <h1>NO Result Found</h1>
                </div>
                </section>
            )
        }
         }else return(
            <section className="container">
            <div className="col-sm-8 col-sm-offset-2">
                <h1>NO Result Found</h1>
            </div>
            </section>
        )
        
        
    }
}

export default Result;