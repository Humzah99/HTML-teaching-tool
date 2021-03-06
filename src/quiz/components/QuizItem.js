import React from "react";
import { Link } from "react-router-dom";
import "../../shared/components/Style.css";
const QuizItem = props => {
  return (
    <div className="col-sm-4">

      <div className="card quiz-list-card mt-5 ms-5" style={{ width: "21rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {props.questionCount.length} {props.questionCount.length === 1 ? 'Question' : 'Questions'}
          </h6>
          <div className="row">
            <div className="col-md-4 float-start">
              <Link to={`/quiz/${props.id}`}>Advance</Link>
            </div>
            <div className="col-md-8 float-end">
              <Link to={`${props.id}/high-scores`}>View Leaderboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
