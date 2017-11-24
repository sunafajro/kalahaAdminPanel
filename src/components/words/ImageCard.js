import React from "react";
import { object } from "prop-types";

import { jsUcfirst } from "../../utils";
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
        <img
          style={{ width: "16px", height: "12px" }}
          src={"/files/images/site/cv.png"}
          alt="Чӑвашла"
        /> {jsUcfirst(word.cv)}<br />
          <img
          style={{ width: "16px", height: "12px" }}
          src={"/files/images/site/ru.png"}
          alt="Русский"
        /> {jsUcfirst(word.ru)}
        </div>
      </div>
    );
}

export default Card;
