import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormValidation/Input";
import { useForm } from "../../shared/hooks/forms-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/components/FormValidation/validators";
import "../../shared/components/Style.css";
import "../../shared/components/ImageUpload/ImageUpload.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/components/context/auth-context";
import { Link } from "react-router-dom";
import Footer from "../../shared/components/Footer/Footer";

const UserProfile = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const [loadedUser, setLoadedUser] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: "",
        isValid: false
      },
      surname: {
        value: "",
        isValid: false
      },
      username: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      }
    },
    false
  );


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/user/${userId}`);
        setLoadedUser(responseData.user);
        setFormData(
          {
            firstName: {
              value: responseData.user.firstname,
              isValid: true
            },
            surname: {
              value: responseData.user.surname,
              isValid: true
            },
            username: {
              value: responseData.user.username,
              isValid: true
            },
            email: {
              value: responseData.user.email,
              isValid: true
            }
          },
          true
        );
      } catch (err) {
      }
    };
    fetchUser();

  }, [sendRequest, userId]);

  const updateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/user/${userId}`, 'PATCH', JSON.stringify({
        firstname: formState.inputs.firstName.value,
        surname: formState.inputs.surname.value,
      }),
        {
          'Content-Type': 'application/json'
        }
      );
      alert("User profile updated.")
      history.push(`/`);
    } catch (err) { }
  };

  if (isLoading) {
    return (
      <div className="overlay">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!loadedUser && !error) {
    return (
      (
        <div className="container">
          <h3 className="mt-5 text-center">Could not find user information.</h3>
        </div>
      )
    );
  }

  return (
    <React.Fragment>
      <Modal show={!!error} onCancel={clearError}>
        <Modal.Header className="modal-header">
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {error}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={clearError}>
            Ok
          </button>
        </Modal.Footer>
      </Modal>
      <div className="row update-user-row">
        <div className="col-md-6" style={{ marginTop: "5%" }}>
          <div className="card mx-auto login-card">
            {!isLoading && loadedUser && <form onSubmit={updateSubmitHandler} className="auth-form">
              <div>
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <img className="user-profile-image"
                      src={`http://localhost:5000/${loadedUser.image}`} alt={loadedUser.firstname + " " + loadedUser.surname}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      element="input"
                      id="firstName"
                      type="text"
                      label="First Name"
                      className="form-control rounded-3"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter a valid first name."
                      onInput={inputHandler}
                      value={loadedUser.firstname}
                      valid={true}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      element="input"
                      id="surname"
                      type="text"
                      label="Surname"
                      className="form-control rounded-3"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter a valid surname."
                      onInput={inputHandler}
                      value={loadedUser.surname}
                      valid={true}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <Input
                      element="input"
                      id="username"
                      type="text"
                      label="Username"
                      className="form-control rounded-3"
                      disabled={true}
                      validators={[VALIDATOR_MINLENGTH(8)]}
                      errorText="Please enter a valid username."
                      onInput={inputHandler}
                      value={loadedUser.username}
                      valid={true}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <Input
                    element="input"
                    id="email"
                    type="email"
                    label="E-mail"
                    className="form-control rounded-3"
                    disabled={true}
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid e-mail address."
                    onInput={inputHandler}
                    value={loadedUser.email}
                    valid={true}
                  />
                </div>
              </div>
              <div className="row mt-5 text-center" style={{ width: '28%', marginLeft: '33%' }}>
                <button
                  type="submit"
                  className="btn"
                  disabled={!formState.isValid}
                >
                  Save Changes
                </button>
              </div>
            </form>}
          </div>
        </div>
        <div className="col-md-6" style={{ marginTop: "5%" }}>
          <div className="row latest-questions-card">
            <div className="card lq-card-item">
              <div className="card-title">
                <div className="row mt-4 ms-2">
                  <div className="col-md-3">
                    <h3>Latest Questions</h3>
                  </div>
                  <div className="col-md-5">
                    <Link className="btn rounded-pill" to={`/forum/user/${auth.userId}`} disabled={loadedUser.questions.length <= 0}>View My Questions</Link>
                  </div>
                </div>
              </div>
              {loadedUser.questions.length > 0 ? (<div className="card-body">
                {loadedUser.questions.slice(loadedUser.questions.length - 2, loadedUser.questions.length).map(question => (
                  <div key={question.id} className="card forum-list-card mt-3">
                    <div className="card-body">
                      <h5 className="card-title">{question.heading}</h5>
                      <p className="card-text">{question.text}</p>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 flex-fill bd-highlight"></div>
                        <div className="p-2 flex-fill bd-highlight text-end">
                          <Link to={`/forum/view/${question.id}`} className="btn btn-success">
                            View question
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>) : (
                <React.Fragment>
                  <div className="hr-line mt-3 mb-2"></div>
                  <div className="card-body text-center mt-3">
                    <h5>No questions found. Try to add a question...</h5>
                    {auth.isLoggedIn ? (
                      <Link to="/forum/new" className="btn rounded-pill mt-3">
                        Ask question
                      </Link>
                    ) : (
                      <button to="/auth" className="btn rounded-pill mt-3">
                        Ask question
                      </button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="row latest-scores-card">
            <div className="card ls-card-item">
              <div className="card-title">
                <div className="row mt-4 ms-2">
                  <div className="col-md-3">
                    <h3>Latest Scores</h3>
                  </div>
                  <div className="col-md-5">
                    <Link className="btn rounded-pill" disabled={loadedUser.scores.length <= 0} to={`/userScores/${auth.userId}`}>View My Scores</Link>
                  </div>
                </div>
              </div>

              {loadedUser.scores.length > 0 ? (<div className="card-body">
                <table className="styled-table scores-table">
                  <thead>
                    <tr>
                      <th>Quiz Name</th>
                      <th>Quiz Date</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadedUser.scores.sort((a, b) => (a.score < b.score) ? 1 : -1).slice(loadedUser.scores.length - 3, loadedUser.scores.length).map(score => (
                      <tr key={score.id}>
                        <td>{score.quiz.title}</td>
                        <td>{score.quizDate}</td>
                        <td>{score.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>) : (
                <React.Fragment>
                  <div className="hr-line mt-3 mb-2"></div>
                  <div className="card-body text-center mt-3">
                    <h5>No scores found. Attempt a quiz...</h5>
                    {auth.isLoggedIn ? (
                      <Link to="/quiz" className="btn rounded-pill mt-3">
                        Go To Quiz
                      </Link>
                    ) : (
                      <button to="/auth" className="btn rounded-pill mt-3">
                        Go To Quiz
                      </button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default UserProfile;
