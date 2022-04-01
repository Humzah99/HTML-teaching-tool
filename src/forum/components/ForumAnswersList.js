import React from "react";
import "../../shared/components/Style.css";
import ForumAnswersItem from "./ForumAnswersItem";

const ForumAnswersList = props => {

    return (
        < div className="answers-container mt-5 mb-5" >
        <h3 style={{ fontWeight: "normal" }}>
            {props.items.length} {props.items.length === 1 ? "answer" : "answers"}
        </h3>
            {
                props.items.map(answer => (
                    <ForumAnswersItem
                        key={answer.id}
                        id={answer.id}
                        text={answer.text}
                        user={answer.user}
                        question={answer.question}
                        createdAt={answer.createdAt}
                        onDelete={props.onDeleteAnswer}
                    />
                ))
            }
        </div >
    );
};

export default ForumAnswersList;
