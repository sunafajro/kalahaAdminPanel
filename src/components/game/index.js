import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bool, func, object, string } from "prop-types";

import { getCategories } from "../../modules/actions/categories";
import { getCategoryWords } from "../../modules/actions/words";
import Quiz from "./quiz";
import Audio from "./audio";

class Game extends React.Component {
  state = {
    activeCategory: {}
  }

  static propTypes = {
    fetchingCategories: bool.isRequired,
    categories: object.isRequired,
    fetchingWords: bool.isRequired,
    words: object.isRequired,
    error: object.isRequired,
    language: string.isRequired,
    labels: object.isRequired,
    getCategories: func.isRequired,
    getCategoryWords: func.isRequired,
  };
  
  /* вызываем действие для получения категорий */
  componentDidMount() {
    this.props.getCategories();
  }
  
  /* 
   * если категория в стейте пустая, а из редакса пришел объект с категориями.
   * берем первую категорию из него, сохраняем в стейт как активную 
   * и вызываем запрос терминов для этой категории
   */
  componentWillReceiveProps (nextProps) {
    if (!Object.keys(this.state.activeCategory).length && Object.keys(nextProps.categories).length) {
      const categoryName = Object.keys(nextProps.categories)[0];
      let activeCategory = nextProps.categories[categoryName];
      activeCategory.name = categoryName;
      this.props.getCategoryWords(categoryName);
      this.setState({ activeCategory });
    }
  }

  render() {
    const state = this.state;
    const props = this.props;
    return (
      <div>
        {props.fetchingCategories ? (
          <div className="alert alert-warning">Загружаем категории...</div>
        ) : (
          <div className="row">
            <div className="col-sm-3">
              {Object.keys(props.error).length ? (
                <div className="alert alert-danger">{props.error.text}</div>
              ) : (
                ""
              )}
              <h3>Категории:</h3>
              {Object.keys(props.categories).length ? (
                <div className="list-group">
                  {Object.keys(props.categories).map(item => {
                    return (
                      <span
                        key={"category-" + item}
                        style={{ cursor: 'pointer' }}
                        className={
                          state.activeCategory.name === item
                            ? "list-group-item active"
                            : "list-group-item"
                        }
                        onClick={e => {
                          e.preventDefault();
                          let activeCategory = props.categories[item];
                          activeCategory.name = item;
                          this.setState({ activeCategory });
                          props.getCategoryWords(item);
                        }}
                      >
                        {props.categories[item].title[props.language]}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p>
                  <i>Нет доступных категорий!</i>
                </p>
              )}
            </div>
            <div className="col-sm-9">
              {props.fetchingWords ? (
                <div className="alert alert-warning">Загружаем слова...</div>
              ) : (
                <div className="row align-items-center" style={{minHeight: '200px'}}>
                  { Object.keys(props.words).length ?
                    <Quiz activeCategory={state.activeCategory} /> : ""}
                </div>
              )}
              <Audio />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchingCategories: state.categories.fetching,
  fetchingWords: state.words.fetching,
  categories: state.categories.data,
  words: state.words.data,
  labels: state.app.labels,
  language: state.app.language,
  error: state.categories.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCategories,
      getCategoryWords
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);
