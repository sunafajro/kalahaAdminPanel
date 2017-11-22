import React from "react";
import { func, string } from "prop-types";

ResponseOne.propTypes = {
  id: string.isRequired,
  check: func.isRequired,
  elementClass: string.isRequired,
  response: string.isRequired,
};

export default function ResponseOne({ id, check, elementClass, response }) {
  return (
    <div
      id={ "panel-" + id }
      style={{ cursor: "pointer", marginBottom: "10px" }}
      className={ elementClass }
      onClick={ check }
    >
      <div id={ "panelHeader-" + id} className="card-body">
        <h3 id={ "response-" + id } className="card-title" style={{ marginBottom: 0 }}>
          { response }
        </h3>
      </div>
    </div>
  );
}
