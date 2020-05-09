import React, { Component } from "react";
import "./assets/style.css";
import ReactDOM from "react-dom";
import quizservice from "./quizService";
import QuestionBox from "./questionBankCompo";
import Result from "./result";

class QuizBase extends Component {
  state = {
    score: 0,
    response: 0,
    questionBank: [],
  };
  getQuestion = () => {
    quizservice().then((question) => {
      this.setState({ questionBank: question });
    });
  };

  componentDidMount() {
    this.getQuestion();
  }

  computeanwser = (answer, correct) => {
    if (answer === correct) {
      this.setState({
        score: this.state.score + 1,
      });
    }
    this.setState({
      response: this.state.response < 5 ? this.state.response + 1 : 5,
    });
  };

  playagain = () => {
    this.getQuestion();
    this.setState({
      score: 0,
      response: 0,
    });
  };

  render() {
    return (
      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <div className="title">QuizBEE</div>
        {this.state.questionBank.length > 0 &&
          this.state.response < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={(answer) => this.computeanwser(answer, correct)}
              />
            )
          )}
        {this.state.response === 5 ? (
          <Result score={this.state.score} playagain={this.playagain} />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBase />, document.getElementById("root"));
