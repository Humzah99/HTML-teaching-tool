import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormValidation/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/components/FormValidation/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};
const NewForumQuestion = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      questionTitle: {
        value: "",
        isValid: false
      },
      questionDescription: {
        value: "",
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const submitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // Send this to the backend
  };

  return (
    <div className="container aligment-container">
      <div className="row">
        <div className="col-md">
          <h3>Ask a Question</h3>
        </div>
      </div>
      <div className="col-md">
        <div className="card ask-question-container">
          <div className="card-body">
            <form onSubmit={submitHandler}>
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
              />
              <button className="btn mt-3" type="submit" disabled={!formState.isValid}>
                Post question
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewForumQuestion;
