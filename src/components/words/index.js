import React from "react";
import { bool, func, object, string } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getCategoryWords } from "../../modules/actions/words";
import Card from "./ImageCard";
import Sidebar from "./Sidebar";
import { Translations } from "../../translations/words";

class Words extends React.Component {
  state= {
    html: []
  }

  static propTypes = {
    fetching: bool.isRequired,
    words: object.isRequired,
    error: object.isRequired,
    language: string.isRequired,
    getCategoryWords: func.isRequired,
  };

  /* вызываем действие для получения терминов из категории "Все" */
  componentDidMount() {
    this.props.getCategoryWords('all');
  }
  
  /* получаем объект с терминами, обрабатываем и кладем в стейт */
  componentWillReceiveProps (nextProps) {
    const num = Object.keys(nextProps.words).length;
    let html = [];
    if (num) {
      let row = 1;
      let items = Object.keys(nextProps.words);
      while (items.length > 0) {
        let columns = items.splice(0, 5);
        html.push(
          <div key={"row-" + row} className="card-deck" style={{ marginBottom: '10px' }}>
            {columns.map(el => {
              return <Card key={"card-" + el} word={nextProps.words[el]} />;
            })}
          </div>
        );
        row++;
      }
    }
    this.setState({ html });
  }

  render() {
    const { html } = this.state;
    const { fetching, language } = this.props;
    return (
      <div>
        { fetching ? (
          <div className="alert alert-warning">
            { Translations.appDataLoadingProccess[language] }
          </div>
        ) : (
          <div className="row">
            <div className="col-sm-3">
              <Sidebar
                Translations={Translations}
              />
            </div>
            <div className="col-sm-9">
              { html ? html : ""}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.words.fetching,
  words: state.words.data,
  language: state.app.language,
  error: state.categories.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCategoryWords
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Words);
