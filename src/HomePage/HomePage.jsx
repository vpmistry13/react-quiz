import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { userActions } from '../_actions';
import QuizMain from '../_components/Quiz/QuizMain.jsx';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { counter: 0 ,quiz_option : 0,isLoading:false};
        this.handleOnChangeQuiz = this.handleOnChangeQuiz.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
      }

    componentDidMount() {
        this.props.getUsers();
    }

    //loading handler
    handleLoading(v){
        this.setState({isLoading:v});
    }
    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    handleOnChangeQuiz(value){
        this.setState({quiz_option:value,isLoading:true})
    }

    render() {
        const { user, users } = this.props;
        const {quiz_option , isLoading} = this.state;
        
        return (
            <section className="container">
            <div className="row">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p> 
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
            <div className="row">
                {
                    quiz_option == 0 ?
                    <div className="col-md-3">
                            <h2>Start the Quiz</h2>
                            <p>Good luck!</p> 
                            <select name="select_quiz" className="form-control" onChange={(e) => this.handleOnChangeQuiz(e.target.value)}>
                                <option value='0'>----Select Quiz----</option>
                                <option value="1">JavaScript</option>
                                <option value="2">HTML</option>
                                <option value="3">CSS</option>
                            </select> 
                            </div>
                     :
                    <div className="col-md-10">  
                        <QuizMain quiz_option={quiz_option} isLoading={isLoading} handleLoading={this.handleLoading}/>
                     </div>
                
                }
            </div>
            </section>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };