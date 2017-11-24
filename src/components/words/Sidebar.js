import React from 'react';
import { bool, func, object, string } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getCategories } from "../../modules/actions/categories";
import { createWord, updateWord, deleteWord } from "../../modules/actions/words";
import InputField from './InputField';
import WordFilters from "./WordFilters";

class Sidebar extends React.Component {
  state = {
    filter: {},
    word: {
      cv: '',
      ru: '',
      image: '',
      audio: ''
    },
    valid: true
  }

  static propTypes = {
    categories: object.isRequired,
    error: object.isRequired,
    fetching: bool.isRequired,
    getCategories: func.isRequired,
    language: string.isRequired,
    Translations: object.isRequired
  }

  componentDidMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps (nextProps) {
    if (Object.keys(nextProps.categories).length && Object.keys(this.state.filter)) {
      let filter = {};
      Object.keys(nextProps.categories).forEach(item => {
        filter[item] = '';
      });
      this.setState({ filter });
    }
  }

  /**
   * @param { string } key
   * @param { string } superkey
   * @param { string } value
   */
  handleUpdate = (key, superkey, value) => {
    if (superkey) {
      let section = { ...this.state[superkey] };
      section[key] = value;
      this.setState({ [superkey]: section });
    } else {
      this.setState({ [key]: value });
    }
  }

  render() {
    const { filter, word } = this.state;
    const { categories, fetching, language, Translations } = this.props;
    return (
      <div>
        <h4>Добавить слово:</h4>
        <form>
          <InputField
            name="cv"
            title={ Translations.newWordFieldTitleCV[language] }
            value={ word.cv }
            handleUpdate={ this.handleUpdate }
            disabled={ fetching ? true : false}
          />
          <InputField
            name="ru"
            title={ Translations.newWordFieldTitleRU[language] }
            value={ word.ru }
            handleUpdate={ this.handleUpdate }
            disabled={ fetching ? true : false}
          />
          <InputField
            name="image"
            title={ Translations.newWordFieldTitleImage[language] }
            value={ word.image }
            handleUpdate={ this.handleUpdate }
            disabled={ fetching ? true : false}
          />
          <InputField
            name="audio"
            title={ Translations.newWordFieldTitleAudio[language] }
            value={ word.audio }
            handleUpdate={ this.handleUpdate }
            disabled={ fetching ? true : false}
          />
          <button
            className="btn btn-block btn-success btn-sm"
            onClick={(e) => {
              e.preventDefault();
            }}
          >Создать</button>
        </form>
        <h4>{ Translations.filtersBlockTitle[language] }:</h4>
        {Object.keys(categories).length && Object.keys(filter).length ? 
          <WordFilters
            categories={categories}
            filter={filter}
            handleUpdate={this.handleUpdate}
            language={language}
          /> : "" }
      </div>
    ); 
  }
}

const mapStateToProps = state => ({
  categories: state.categories.data,
  error: state.categories.error,
  fetching: state.words.fetching,
  language: state.app.language,
  word: state.words.word,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCategories,
      createWord,
      updateWord,
      deleteWord
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);