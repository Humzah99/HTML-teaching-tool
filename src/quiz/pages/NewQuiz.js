import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../components/NewQuiz.css";
import "../../shared/components/Style.css";
const DUMMY_QUIZ = [
  {
    id: "1",
    title: "HTML Tables",
    questions: [
      {
        questionText:
          "What of the following HTML tag is used to define a table?",
        answerOptions: [
          { answerText: "<tbl>", isCorrect: false },
          { answerText: "<tb>", isCorrect: false },
          { answerText: "<tab>", isCorrect: false },
          { answerText: "<table>", isCorrect: true },
        ],
      },
      {
        questionText: "Which of the following tag defines a table row?",
        answerOptions: [
          { answerText: "<tr>", isCorrect: true },
          { answerText: "<row>", isCorrect: false },
          { answerText: "<tablerow>", isCorrect: false },
          { answerText: "<table-row>", isCorrect: false },
        ],
      },
      {
        questionText:
          "Which element is used to create a separate table footer?",
        answerOptions: [
          { answerText: "None of them", isCorrect: false },
          { answerText: "<tfoot>", isCorrect: true },
          { answerText: "<footer>", isCorrect: false },
          { answerText: "<sepfooter>", isCorrect: false },
        ],
      },
      {
        questionText: "Each cell of the table is represented by ____",
        answerOptions: [
          { answerText: "<th>", isCorrect: false },
          { answerText: "<td>", isCorrect: true },
          { answerText: "<tr>", isCorrect: false },
          { answerText: "<thead>", isCorrect: false },
        ],
      },
      {
        questionText:
          "Which of the following attributes allows for merging of two rows in a table?",
        answerOptions: [
          { answerText: "Colmerge", isCorrect: false },
          { answerText: "Colspan", isCorrect: false },
          { answerText: "Rowspan", isCorrect: true },
          { answerText: "Rowmerge", isCorrect: false },
        ],
      },
      {
        questionText: "What tag is used to add a caption to a table?",
        answerOptions: [
          { answerText: "<tcaption>", isCorrect: false },
          { answerText: "<tc>", isCorrect: false },
          { answerText: "<table-caption>", isCorrect: false },
          { answerText: "<caption>", isCorrect: true },
        ],
      },
      {
        questionText:
          "Which of the following can be used to define the spacing between the cells of a table?",
        answerOptions: [
          { answerText: "cell-spacing", isCorrect: false },
          { answerText: "border-spacing", isCorrect: true },
          { answerText: "spacing", isCorrect: false },
          { answerText: "table-spacing", isCorrect: false },
        ],
      },
      {
        questionText:
          "Which attribute should be used with a <td> tag to merge two cells horizontally?",
        answerOptions: [
          {
            answerText: "merge = row2",
            isCorrect: false,
          },
          {
            answerText: "rowspan = 2",
            isCorrect: false,
          },
          {
            answerText: "colspan = 2",
            isCorrect: true,
          },
          { answerText: "merge = colspan2", isCorrect: false },
        ],
      },
      {
        questionText: "The table border can be collapsed by ____",
        answerOptions: [
          { answerText: "border-collapse: collapse", isCorrect: true },
          { answerText: "border: collapse", isCorrect: false },
          { answerText: "table-border: collapse", isCorrect: false },
          { answerText: "table-border-collapse: collapse", isCorrect: false },
        ],
      },
      {
        questionText:
          "Which of the following elements is not associated with the HTML table layout",
        answerOptions: [
          { answerText: "size", isCorrect: false },
          { answerText: "color", isCorrect: true },
          { answerText: "spanning", isCorrect: false },
          { answerText: "alignment", isCorrect: false },
        ],
      },
    ],
  },
];
const NewQuiz = () => {
  const quizId = useParams().quizId;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [restart, setRestart] = useState(false);

  const answerButtonClickHandler = (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < currentQuiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartButtonHandler = () => {
    setRestart(true);
    setScore(score * 0);
    if (restart) {
      setShowScore(false);
      setCurrentQuestion(0);
    }
    console.log(currentQuestion);
  };

  const currentQuiz = DUMMY_QUIZ.find((q) => q.id === quizId);
  return (
    <>
      {" "}
      <div className="row">
        <div className="col-md">
          <h3 className="quiz-title">{currentQuiz.title}</h3>
        </div>
      </div>
      <div className="container new-quiz-container">
        {showScore ? (
          <>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="final-score col-md-4 text-center">
                <h3>
                  You scored {score} out of {currentQuiz.questions.length}
                </h3>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row quiz-button-container">
              <div className="col-sm-4 text-center">
                <button
                  className="btn final-score-options"
                  onClick={restartButtonHandler}
                >
                  Restart
                </button>
              </div>
              <div className="col-sm-4 text-center">
                <Link to="/documentation" className="btn final-score-options">
                  See {currentQuiz.title} documentation
                </Link>
              </div>
              <div className="col-sm-4 text-center">
                <Link to="/allQuizzes" className="btn final-score-options">
                  Return to All quiz page
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/
                {currentQuiz.questions.length}
              </div>
              <div className="question-text">
                <p>{currentQuiz.questions[currentQuestion].questionText}</p>
              </div>
              <div className="answer-section">
                {currentQuiz.questions[currentQuestion].answerOptions.map(
                  (answerOption) => (
                    <div className="mt-4">
                      <button
                        className="answer-option"
                        onClick={() =>
                          answerButtonClickHandler(answerOption.isCorrect)
                        }
                      >
                        {answerOption.answerText}
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NewQuiz;
