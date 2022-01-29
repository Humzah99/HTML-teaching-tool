import React from "react";
import "../../shared/components/Style.css";
const QuizItem = props => {
  return (
    <div className="col-sm-6">
      <a href="/">
        <div className="card quiz-list-card mt-5 ms-5" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {props.questionCount}{" "}
              {props.questionCount === 1 ? "Question" : "Questions"}
            </h6>
            <p className="card-text">Add quiz information here</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default QuizItem;
