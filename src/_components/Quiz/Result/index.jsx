import React, {Component} from 'react'; 

class Result extends Component {

    constructor(props) {
        super(props); 
      }

    componentDidMount() {
        
    }
 
  

    render() {
        const{ state } = this.props.location;
        const{ attempt_question } = state;
        var total_score = 0;
        attempt_question.map((d) => {
            if(d.correct_option == d.choose_option){
                total_score++;
            }
        })
        if(attempt_question && attempt_question.length > 0){
            return (
                <section className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                    <div id="result-of-question" className="pulse animated" >
                            <span id="totalCorrect" className="pull-right">Total correct: <strong>{total_score}</strong></span>
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
                                            <td>{correct_option == choose_option ? 'Correct':'Incorrect'}</td>
                                        </tr>)
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <div  className="row">
                            <div className="col-md-3">
                                <button type="button" className="btn btn-danger">Restart Quiz</button>
                            </div>
                            <div className="col-md-3">
                                <button type="button" className="btn btn-primary">Start New Quiz</button>
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
        
    }
}

export default Result;