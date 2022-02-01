import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormValidation/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/components/FormValidation/validators";
import { useForm } from "../../shared/hooks/forms-hooks";

const DUMMY_QUESTIONS = [
  {
    id: "1",
    heading: "How can I construct a HTML table?",
    text:
      "Please can I have some information on the basics of constructing a HTML table? Here is my code..."
  },
  {
    id: "2",
    heading: "My HTML heading does not render on screen.",
    text:
      "Can anyone help me identify the issue with this code that is not allowing any headings to render on to the screen?"
  }
];

const UpdateForumQuestion = () => {
  const [isLoading, setIsLoading] = useState(true);
  const questionId = useParams().questionId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      questionTitle: {
        value: "",
        isValid: false
      },
      questionDescription: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const identifiedQuestion = DUMMY_QUESTIONS.find(q => q.id === questionId);

  useEffect(() => {
    if (identifiedQuestion) {
      setFormData(
        {
          questionTitle: {
            value: identifiedQuestion.heading,
            isValid: true
          },
          questionDescription: {
            value: identifiedQuestion.text,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedQuestion]);

  const updateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedQuestion) {
    return (
      console.log(questionId),
      console.log(identifiedQuestion),
      (
        <div className="container">
          <h3 className="mt-5 text-center">Could not identify the question.</h3>
        </div>
      )
    );
  }

  if (isLoading) {
    return (
      <div className="container">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container alignment-container">
      <div className="row">
        <div className="col-md">
          <h3>Update question</h3>
        </div>
      </div>
      <div className="col-md">
        <div className="card ask-question-container">
          <div className="card-body">
            <form onSubmit={updateSubmitHandler}>
              <h5 className="card-title">Heading</h5>
              <Input
                id="questionTitle"
                className="form-control"
                element="input"
                type="text"
                placeholder="Enter question title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Enter a suitable question heading."
                onInput={inputHandler}
                value={formState.inputs.questionTitle.value}
                valid={formState.inputs.questionTitle.isValid}
              />
              <h5 className="card-title mt-3">Body</h5>
              <Input
                id="questionDescription"
                className="form-control"
                rows="10"
                placeholder="Enter question description..."
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorText="Enter a suitable question description (at least 10 characters long)."
                onInput={inputHandler}
                value={formState.inputs.questionDescription.value}
                valid={formState.inputs.questionDescription.isValid}
              />
              <button
                className="btn mt-3"
                type="submit"
                disabled={!formState.isValid}
              >
                Update question
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForumQuestion;
