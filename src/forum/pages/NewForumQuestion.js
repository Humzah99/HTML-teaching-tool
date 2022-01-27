import React from "react";
import Input from '../../shared/components/FormValidation/Input';

const NewForumQuestion = () => {
  return (
    <div className="container aligment-container">
      <div className="row">
        <div className="col-md">
          <h3>Ask a Question</h3>
        </div>
      </div>
      <div className="col-md">
        <div className="card">
          <div className="card-body">
            <form>
                <h5 className="card-title">Heading</h5>
                <Input element="input" type="text" label="Heading" placeholder="Enter Question title"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewForumQuestion;
