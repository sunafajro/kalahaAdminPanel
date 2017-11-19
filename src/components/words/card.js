import React from "react";

const baseUrl = "/sites/default/files/flashcards";

class Card extends React.Component {
  render() {
    const props = this.props;
    let urlThmbImg;
    let urlFullImg;
    if (props.word.image) {
      if (props.word.categories && props.word.categories.kalaha1) {
        urlThmbImg = baseUrl + "/kalaha1/thmb/";
        urlFullImg = baseUrl + "/kalaha1/full/";
      } else if (props.word.categories && props.word.categories.kalaha2) {
        urlThmbImg = baseUrl + "/kalaha2/thmb/";
        urlFullImg = baseUrl + "/kalaha2/full/";
      }
    }
    return (
      <div className="card" style={{width: "100px"}}>
        {urlThmbImg ? (
          <img
            className="card-img-top"
            src={urlThmbImg + props.word.image + ".jpg"}
            alt={props.word.cv}
          />
        ) : (
          ""
        )}
        <div className="card-body">
          <h5 className="card-title">{props.word.cv}</h5>
          <p>{props.word.ru}</p>
        </div>
      </div>
    );
  }
}

export default Card;
