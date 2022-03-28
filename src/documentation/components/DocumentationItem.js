import React from "react";
import "../../shared/components/Style.css";
const DocumentationItem = (props) => {

  return (
    <React.Fragment>
      <div className="col-md-6 mt-5">
        <a href={`/documentation/${props.id}`}>
          <div className="card doc-card">
            <div className="card-body">
              <h4 className="card-title">{props.title}</h4>
              <p className="card-text">{props.description}</p>
            </div>
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default DocumentationItem;
