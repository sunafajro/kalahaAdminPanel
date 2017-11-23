import React from "react";
import { object } from "prop-types";

const baseUrl = "/files/images/flashcards";

Card.propTypes = {
  word: object.isRequired
};

function Card({ word }) {
    let urlThmbImg;
    let urlFullImg;
    if (word.image) {
      if (word.categories && word.categories.kalaha1) {
        urlThmbImg = baseUrl + "/kalaha1/thmb/";
        urlFullImg = baseUrl + "/kalaha1/full/";
      } else if (word.categories && word.categories.kalaha2) {
        urlThmbImg = baseUrl + "/kalaha2/thmb/";
        urlFullImg = baseUrl + "/kalaha2/full/";
      }
    }
    return (
      <div className="card" style={{width: "100px"}}>
        {urlThmbImg ? (
          <img
            className="card-img-top"
            src={urlThmbImg + word.image + ".jpg"}
            alt={word.cv}
          />
        ) : (
          ""
        )}
        <div className="card-body">
          <h5 className="card-title">{word.cv}</h5>
          <p>{word.ru}</p>
        </div>
      </div>
    );
}

export default Card;
