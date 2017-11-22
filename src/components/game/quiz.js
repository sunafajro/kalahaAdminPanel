import React from "react";
import { connect } from "react-redux";
import { object } from 'prop-types';

import {
  CLASSLIST,
  CLASSLIST_CORRECT,
  CLASSLIST_INCORRECT
} from "./constants";
import Response from './response';

class Quiz extends React.Component {
  state = {
    start: false,
    active: false,
    totalCount: 0,
    correctId: null,
    word: null,
    responses: {},
    classList: { ...CLASSLIST }
  }

  static propTypes = {
    activeCategory: object.isRequired,
    words: object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.activeCategory !== nextProps.activeCategory) {
      this.setState({ start: false, active: false });
    }
  }

  componentWillUnmount () {
    this.setState({ start: false, active: false });
  }

  /* генерируем случайное число <= min и > max */
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /* подготавливаем игру к очередному раунду */
  prepareQuizData = () => {
    const words = { ...this.props.words };
    /* так как ответов четыре, проверяем что исходный объект содежит такое количество */
    if (Object.keys(words).length >= 4) {
      const num = this.getRandomInt(1, Object.keys(words).length + 1);
      const word = words[Object.keys(words)[num-1]];
      /* вызываем функцию подготовки вариантов ответа */
      const { correctId, responses } = this.prepareResponses(word, words);
      this.setState({
        word,
        correctId: correctId,
        responses: responses,
        classList: CLASSLIST,
        active: true
      });
      if (!this.state.start) {
        this.setState({ start: true });
      }     
    }
  };

  /**
   * выбираем случайные ответы из общего списка слов
   * @param { Object } word
   * @param { Object } words
   * @returns { Object }
   */
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

  /**
   * готовим объект варианта ответа
   * @param { Object } responses
   * @param { Object } words
   * @returns { Object }
   */
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
      const word = words[Object.keys(words)[num-1]];
      Object.keys(responses).forEach(el => {
        if (word.cv === responses[el].cv) {
          check = false;
        }
      });
      if (check) {
        response = words[Object.keys(words)[num-1]];
      }
      i++;
    }
    return response;
  };

  /** 
   * @param { Object } e
  */
  checkAnswer = e => {
    if (this.state.active) {
      const correctAnswer = document.querySelector("#teres");
      const incorrectAnswer = document.querySelector("#teres_mar");
      const num = e.target.id.substr(-1, 1);
      let totalCount = this.state.totalCount;
      let classList = { ...this.state.classList };
      if (this.state.responses[num].cv === this.state.word.cv) {
        totalCount++;
        classList[num] = CLASSLIST_CORRECT;
        correctAnswer.play();
      } else {
        if (totalCount > 0) {
          totalCount--;
        }
        classList[num] = CLASSLIST_INCORRECT;
        classList[this.state.correctId] = CLASSLIST_CORRECT;
        incorrectAnswer.play();
      }
      this.setState({
        totalCount,
        classList,
        active: false
      });
    }
  };

  render() {
    const { classList, responses, start, totalCount, word } = this.state;
    return (
      <div className="col-sm-12 text-center">
        { start ? (
          <div>
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3>Общий счет: { totalCount }</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8 offset-sm-2 jumbotron text-center">
                <h1 style={{ marginBottom: 0 }}>{ word.cv}</h1>
              </div>
            </div>
            {Object.keys(responses).length ? (
              <div className="row">
                <div className="col-sm-4 offset-sm-2 text-center">
                  <Response id={ '1' } elementClass={ classList[1] } response={responses[1].ru} check={ this.checkAnswer } />
                  <Response id={ '3' } elementClass={ classList[3] } response={responses[3].ru} check={ this.checkAnswer } />
                </div>
                <div className="col-sm-4 text-center">
                  <Response id={ '2' } elementClass={ classList[2] } response={responses[2].ru} check={ this.checkAnswer } />
                  <Response id={ '4' } elementClass={ classList[4] } response={responses[4].ru} check={ this.checkAnswer } />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col-sm-12 text-center">
                <button
                  className="btn btn-lg btn-success"
                  onClick={ this.prepareQuizData }
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
  words: state.words.data
});

export default connect(mapStateToProps, null)(Quiz);