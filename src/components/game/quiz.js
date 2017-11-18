import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  CLASSLIST,
  CLASSLIST_DEFAULT,
  CLASSLIST_CORRECT,
  CLASSLIST_INCORRECT
} from "../../modules/reducers/quiz";
import { updateQuizState } from "../../modules/actions/quiz";

class Quiz extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.activeCategory !== nextProps.activeCategory) {
      let quiz = { ...this.props.quiz };
      quiz.start = false;
      quiz.active = false;
      this.props.updateQuizState(quiz);
    }
  }
  componentWillUnmount () {
    let quiz = { ...this.props.quiz };
    quiz.start = false;
    quiz.active = false;
    this.props.updateQuizState(quiz);
  }

  /* генерируем случайное число <= min и > max */
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  prepareQuizData = () => {
    let quiz = { ...this.props.quiz };
    quiz.words = this.props.words;
    const num = this.getRandomInt(1, Object.keys(quiz.words).length + 1);
    const word = quiz.words[num];
    const { correctId, responses } = this.prepareResponses(word, quiz.words);
    quiz.correctId = correctId;
    quiz.word = word;
    quiz.responses = responses;
    quiz.classList = CLASSLIST;
    quiz.active = true;
    if (!quiz.start) {
      quiz.start = true;
    }
    this.props.updateQuizState(quiz);
  };

  createResponse = (responses, words) => {
    let response;
    let i = 1;
    while (!response) {
      /* защищаемся от бесконечного цикла */
      if (i > 100) {
        break;
      }
      let check = true;
      const num = this.getRandomInt(1, Object.keys(words).length + 1);
      const word = words[num];
      Object.keys(responses).forEach(el => {
        if (word.cv === responses[el].cv) {
          check = false;
        }
      });
      if (check) {
        response = words[num];
      }
      i++;
    }
    return response;
  };

  prepareResponses = (word, words) => {
    let responses = {};
    const correctId = this.getRandomInt(1, 5);
    responses[correctId] = word;
    let i = 1;
    while (Object.keys(responses).length < 4) {
      /* защищаемся от бесконечного цикла */
      if (i > 100) {
        break;
      }
      const tempNum = this.getRandomInt(1, 5);
      if (!responses.hasOwnProperty(tempNum)) {
        responses[tempNum] = this.createResponse(responses, words);
      }
      i++;
    }
    return { correctId, responses };
  };

  checkAnswer = e => {
    if (this.props.quiz.active) {
      let quiz = { ...this.props.quiz };
      const correctAnswer = document.querySelector("#teres");
      const incorrectAnswer = document.querySelector("#teres_mar");
      const num = e.target.id.substr(-1, 1);
      let totalCount = quiz.totalCount;
      let classList = { ...quiz.classList };
      if (quiz.responses[num].cv === quiz.word.cv) {
        totalCount++;
        classList[num] = CLASSLIST_CORRECT;
        correctAnswer.play();
      } else {
        if (totalCount > 0) {
          totalCount--;
        }
        classList[num] = CLASSLIST_INCORRECT;
        classList[quiz.correctId] = CLASSLIST_CORRECT;
        incorrectAnswer.play();
      }
      quiz.totalCount = totalCount;
      quiz.classList = classList;
      quiz.active = false;
      this.props.updateQuizState(quiz);
    }
  };

  render() {
    const props = this.props;
    return (
      <div className="col-sm-12 text-center">
        {props.quiz.start ? (
          <div>
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3>Общий счет: {props.quiz.totalCount}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8 offset-sm-2 jumbotron text-center">
                <h1 style={{ marginBottom: 0 }}>{props.quiz.word.cv}</h1>
              </div>
            </div>
            {Object.keys(props.quiz.responses).length ? (
              <div className="row">
                <div className="col-sm-4 offset-sm-2 text-center">
                  <div
                    id="panel-1"
                    style={{ cursor: "pointer", marginBottom: "10px" }}
                    className={props.quiz.classList[1]}
                    onClick={this.checkAnswer}
                  >
                    <div id="panelHeader1" className="card-body">
                      <h3 id="response-1" className="card-title" style={{ marginBottom: 0 }}>
                        {props.quiz.responses[1].ru}
                      </h3>
                    </div>
                  </div>
                  <div
                    id="panel-3"
                    style={{ cursor: "pointer" }}
                    className={props.quiz.classList[3]}
                    onClick={this.checkAnswer}
                  >
                    <div id="panelHeader3" className="card-body">
                      <h3 id="response-3" className="card-title" style={{ marginBottom: 0 }}>
                        {props.quiz.responses[3].ru}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 text-center">
                  <div
                    id="panel-2"
                    style={{ cursor: "pointer", marginBottom: "10px" }}
                    className={props.quiz.classList[2]}
                    onClick={this.checkAnswer}
                  >
                    <div id="panelHeader2" className="card-body">
                      <h3 id="response-2" className="card-title" style={{ marginBottom: 0 }}>
                        {props.quiz.responses[2].ru}
                      </h3>
                    </div>
                  </div>
                  <div
                    id="panel-4"
                    style={{ cursor: "pointer" }}
                    className={props.quiz.classList[4]}
                    onClick={this.checkAnswer}
                  >
                    <div id="panelHeader4" className="card-body">
                      <h3 id="response-4" className="card-title" style={{ marginBottom: 0 }}>
                        {props.quiz.responses[4].ru}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col-sm-12 text-center">
                <button
                  className="btn btn-lg btn-success"
                  onClick={this.prepareQuizData}
                >
                  <span
                    className="glyphicon glyphicon-repeat"
                    aria-hidden="true"
                  />{" "}
                  Еще раз!
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-lg btn-primary"
            onClick={ this.prepareQuizData }
          >
            Начать!
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  words: state.words.words,
  quiz: state.quiz,
  activeCategory: state.categories.activeCategory
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateQuizState
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
