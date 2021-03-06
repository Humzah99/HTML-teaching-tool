import React, { useContext } from "react";
import "../../shared/components/Style.css";
import ForumItem from "./ForumItem";
import { AuthContext } from "../../shared/components/context/auth-context";
import { Link } from 'react-router-dom';

const ForumList = props => {
  const auth = useContext(AuthContext);

  if (props.numberOfQuestions === 0) {
    return (
      <div className="container">
        <div className="card no-questions-card mt-5">
          <div className="card-body text-center">
            <h5>No questions found. Try to add a question...</h5>
            {auth.isLoggedIn ? (
            <Link to="/forum/new" className="btn mt-3">
              Ask question
            </Link>
            ) : (
              <Link to="/auth" className="btn mt-3">
                Ask question
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container alignment-container">
      <div className="row">
        <div className="col-md-6 all-questions-heading">
        <h3>{props.myQuestions ? 'My' : 'All'} Questions</h3>
          <p>
            {props.numberOfQuestions}{" "}
            {props.numberOfQuestions === 1 ? "question" : "questions"}
          </p>
        </div>
        <div className="col-md-6">
          <div className="text-end">
            {auth.isLoggedIn && (
              <Link to="/forum/new" className="btn">
                Ask question
              </Link>
            )}
            {!auth.isLoggedIn && (
              <Link to="/auth" className="btn">
                Ask question
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md mt-2">
          {props.items.map(question => (
            <ForumItem
              key={question.id}
              id={question.id}
              heading={question.heading}
              text={question.text}
              user={question.user}
              answers={question.answers}
              createdAt={question.createdAt}
              myQuestions={props.myQuestions}
              onDelete={props.onDeleteQuestion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumList;
