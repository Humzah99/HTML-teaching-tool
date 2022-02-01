import React from "react";
import Input from "../../shared/components/FormValidation/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/components/FormValidation/validators";
import {useForm} from '../../shared/hooks/forms-hooks';


const NewForumQuestion = () => {
  const [formState, inputHandler] = useForm({
  questionTitle: {
    value: "",
    isValid: false
  },
  questionDescription: {
    value: "",
    isValid: false
  }
}, false);
 
  const submitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // Send this to the backend
  };

  return (
    <div className="container alignment-container">
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
