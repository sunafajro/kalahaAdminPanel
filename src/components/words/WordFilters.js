import React from "react";
import { func, object, string } from "prop-types";

import { jsUcfirst } from "../../utils/";

WordsFilter.propTypes = {
  categories: object.isRequired,
  filter: object.isRequired,
  handleUpdate: func.isRequired,
  language: string.isRequired
};

export default function WordsFilter({
  categories,
  filter,
  handleUpdate,
  language
}) {
  return (
    <div>
      {Object.keys(categories).length
        ? Object.keys(categories).map(item => {
            return (
              <div key={"filter-chbx-" + item} className="form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={filter[item]}
                    onChange={e => {
                      handleUpdate(item, "filter", e.target.checked);
                    }}
                  />{" "}
                  {jsUcfirst(categories[item].title[language])}
                </label>
              </div>
            );
          })
        : ""}
        <button className="btn btn-block btn-info btn-sm">Создать</button>
    </div>
  );
}
