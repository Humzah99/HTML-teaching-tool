import React, { useContext } from "react";
import "../../shared/components/Style.css";

const ForumAnswersItem = props => {
    console.log(props);
    return (
        <React.Fragment>
            <div className="card show-answer-container mt-4">
                <div className="card-body">
                    {props != null && (
                        <p className="card-text">{props.text}</p>
                    )}
                </div>
            <div class="card-footer">
              <strong><p className="float-end text-muted"> answered {props.createdAt} by {props.user.username}</p></strong>
            </div>
            </div>
            <div className="hr-line"></div>
        </React.Fragment >
    );
};

export default ForumAnswersItem;
