import React from "react";
import "../../shared/components/Style.css";
const DocumentationItem = props => {
  return (
    <div className="col-md-6 mt-5">
      <a href="/">
        <div className="card doc-card">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default DocumentationItem;
