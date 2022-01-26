import React from "react"; 
import "../../shared/components/Style.css";
const QuizItem = props => {
  return (
    <div className="col-sm-6">
      <div className="card mt-5 ms-5" style={{ width: "18rem" }} >
        <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.questionCount}{" "}
                {props.questionCount === 1 ? "Question" : "Questions"}</h6> 
                <p className="card-text">Add quiz information here</p>
          <a href={props.id} className="card-link">Go to quiz</a>
        </div>
      </div>
    </div>
  ); 
};

export default QuizItem;
