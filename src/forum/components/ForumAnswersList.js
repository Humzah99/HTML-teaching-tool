import React, { useContext } from "react";
import "../../shared/components/Style.css";
import ForumAnswersItem from "./ForumAnswersItem";
import { AuthContext } from "../../shared/components/context/auth-context";

const ForumAnswersList = props => {
    const auth = useContext(AuthContext);

    //   if (props.items.length === 0) {
    //     return (
    //       <div className="container">
    //         <button className="btn btn-lg">Ask question</button>
    //         <div className="card">
    //           <div className="card-body">
    //             No questions found. Try to add a question...
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   }

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
