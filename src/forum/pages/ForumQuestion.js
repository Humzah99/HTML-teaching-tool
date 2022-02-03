import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Editor from "../../documentation/components/Editor";
import Input from "../../shared/components/FormValidation/Input";
import { VALIDATOR_REQUIRE } from "../../shared/components/FormValidation/validators";
import { useForm } from "../../shared/hooks/forms-hooks";
import "../../shared/components/Style.css";
const DUMMY_QUESTIONS = [
  {
    id: "1",
    heading: "How can I construct a HTML table?",
    text: "Please can I have some information on the basics of constructing a HTML table? Here is my code...",
    image: null,
    codeString: `<table>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label
        ><input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We will never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label
        ><input type="password" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="exampleCheck1"
        /><label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </table>`,
    codeResponses: [
      `<table>
    <tr>
      <th>User Form</th>
    </tr>
    <tr>
      <td>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </td>
    </tr>
  </table>`,
    ],
    answers: [
      "See the following link for more information on HTML tables. https://www.w3schools.com/html/html_tables.asp",
      "Navigate to this website's HTML table documentation for more help.",
    ],
  },
  {
    id: "2",
    heading: "My HTML heading does not render on screen.",
    text: "Can anyone help me identify the issue with this code that is not allowing any headings to render on to the screen?",
    image: null,
    codeString: null,
    codeResponses: [],
    answers: [],
  },
];

const ForumQuestion = () => {
  const questionId = useParams().questionId;
  const [formState, inputHandler] = useForm(
    {
      answerText: {
        value: "",
        isValid: false,
      },
      answerCode: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedQuestion = DUMMY_QUESTIONS.find((q) => q.id === questionId);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Send this to the backend
  };

  const allAnswers = [];

  for (let codeResponse of identifiedQuestion.codeResponses) {
    const card = (
      <React.Fragment>
        <div className="card show-answer-container mt-5">
          <div className="card-body">
            {identifiedQuestion.codeResponses != null && (
              <div className="pane">
                <Editor language="xml" value={codeResponse} />
              </div>
            )}
          </div>
        </div>
        <div className="hr-line"></div>
      </React.Fragment>
    );
    allAnswers.push(card);
  }
  for (let answer of identifiedQuestion.answers) {
    const answerCard = (
      <React.Fragment>
        <div className="card show-answer-container mt-4">
          <div className="card-body">
            {identifiedQuestion.answers != null && (
              <p className="card-text">{answer}</p>
            )}
          </div>
        </div>
        <div className="hr-line"></div>
      </React.Fragment>
    );
    allAnswers.push(answerCard);
  }
  return (
    <div className="container alignment-container">
      <div className="row">
        <div className="col-md">
          <h3>{identifiedQuestion.heading}</h3>
        </div>
      </div>
      <div className="col-md">
        <div className="card show-question-container">
          <div className="card-body">
            <p className="card-text">{identifiedQuestion.text}</p>
            {identifiedQuestion.codeString != null && (
              <div className="pane">
                <Editor language="xml" value={identifiedQuestion.codeString} />
              </div>
            )}
          </div>
        </div>
        <div className="answers-container mt-5">
          <h3 style={{ fontWeight: "normal" }}>
            {allAnswers.length} {allAnswers.length === 1 ? "answer" : "answers"}
          </h3>
          {allAnswers}
        </div>
        <div className="form-container mt-5 mb-5">
          <form onSubmit={submitHandler}>
            <h5 className="card-title">Your answer</h5>
            <Input
              id="answerText"
              className="form-control"
              element="input"
              type="text"
              placeholder="Enter answer here"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="An answer is required."
              onInput={inputHandler}
            />
            <button className="btn mt-3" type="submit" disabled={!formState.isValid}>
              Post answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForumQuestion;