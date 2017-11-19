import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllWords } from "../../modules/actions/words";
import Card from "./card";

class Words extends React.Component {
  componentDidMount() {
    this.props.getAllWords();
  }
  render() {
    const props = this.props;
    const num = Object.keys(props.words).length;
    let Html = [];
    if (num) {
      let row = 1;
      let items = Object.keys(props.words);
      while (items.length > 0) {
        let columns = items.splice(0, 5);
        Html.push(
          <div key={"row-" + row} className="card-deck" style={{ marginBottom: '10px' }}>
            {columns.map(el => {
              return <Card key={"card-" + el} word={props.words[el]} />;
            })}
          </div>
        );
        row++;
      }
    }
    return (
      <div>
        {props.fetching ? (
          <div className="alert alert-warning">
            Загружаем данные приложения...
          </div>
        ) : (
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-9">
              {Object.keys(props.words).length ? Html : ""}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.categories.fetching,
  words: state.words.words,
  language: state.app.language,
  labels: state.app.labels,
  error: state.categories.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllWords
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Words);
