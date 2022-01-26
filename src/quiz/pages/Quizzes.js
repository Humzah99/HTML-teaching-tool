import React from "react";
import QuizList from "../components/QuizList";
function Quizzes() {
  const QUIZZES = [{ id: "1", title: "HTML Tables", questions: "10" }];
  return <QuizList items={QUIZZES} />;
};

export default Quizzes;
