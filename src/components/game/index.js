import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getCategories, updateActiveCategory, getCategoryWords } from "../../modules/actions/categories";
import Quiz from './quiz';
import Audio from './audio';

class Game extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    let props = this.props;
    return (
      <div>
        {props.fetchingCategories ? (
          <div className="alert alert-warning">Загружаем данные...</div>
        ) : (
          ""
        )}
        {!props.fetchingCategories ? (
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
                      <a
                        key={"category-" + item}
                        className={
                          props.active.name === item
                            ? "list-group-item active"
                            : "list-group-item"
                        }
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          props.updateActiveCategory(item);
                          props.getCategoryWords(item);
                        }}
                      >
                        {props.categories[item].title[props.language]}
                      </a>
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
                    <Quiz /> : ""}
                </div>
              )}
              <Audio />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchingCategories: state.categories.fetchingCategories,
  fetchingWords: state.categories.fetchingWords,
  active: state.categories.activeCategory,
  categories: state.categories.categories,
  words: state.categories.words,
  labels: state.app.labels,
  language: state.app.language,
  error: state.categories.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCategories,
      getCategoryWords,
      updateActiveCategory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);
