import React from "react";
import "../../shared/components/Style.css";
import ForumItem from "./ForumItem";

const ForumList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="container">
        <button className="btn btn-lg">Ask question</button>
        <div className="card">
          <div className="card-body">
            No questions found. Try to add a question...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container aligment-container">
      <div className="row">
        <div className="col-md-6">
          <h3>All Questions</h3>
          <p>{props.items.length} {props.items.length === 1 ? "question" : "questions"}</p>
        </div>
        <div className="col-md-6">
          <div class="text-end">
            <a href="/" className="btn">
              Ask question
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          {props.items.map((question) => (
            <ForumItem
              key={question.id}
              id={question.id}
              heading={question.heading}
              text={question.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumList;
