import React from "react";
import QuizItem from "./QuizItem";
const QuizList = props => {
  if (props.items.length === 0) {
    return (
      <div className="card">
        <div className="card=body">
          <h2>No quiz available</h2>
        </div>
      </div>
    );
  }
  return (
    <ul>
      {props.items.map(quiz => (
        <QuizItem
          key={quiz.id}
          id={quiz.id}
          title={quiz.title}
          questionCount={quiz.questions}
        />
      ))}
    </ul>
  );
};

export default QuizList;
