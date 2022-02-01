import React, { useContext } from "react";
import "../../shared/components/Style.css";
import ForumItem from "./ForumItem";
import { AuthContext } from "../../shared/components/context/auth-context";
import {Link} from 'react-router-dom';

const ForumList = props => {
  const auth = useContext(AuthContext);
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
    <div className="container alignment-container">
      <div className="row">
        <div className="col-md-6">
          <h3>All Questions</h3>
          <p>
            {props.items.length}{" "}
            {props.items.length === 1 ? "question" : "questions"}
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumList;
