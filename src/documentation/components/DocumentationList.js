import React from "react";
import DocumentationItem from "./DocumentationItem";
const DocumentationList = props => {
  if (props.items.length === 0) {
    return (
      <div className="container">
        <button className="btn btn-lg">Ask question</button>
        <div className="card">
          <div className="card-body">
            No documentation available. Please try again later...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container alignment-container">
      <div className="row">
        <div className="col-md">
          <h3>HTML Documentation</h3>
        </div>
      </div>
      <div className="row">
        {props.items.map(doc => (
          <DocumentationItem
            key={doc.id}
            id={doc.id}
            title={doc.title}
            description={doc.description}
            subTitle={doc.subTitles}
            content={doc.content}
            codeString={doc.codeStringArray}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentationList;
