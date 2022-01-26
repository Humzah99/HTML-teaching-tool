import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import UserProfile from "./user/pages/UserProfile";
import Quizzes from "./quiz/pages/Quizzes";
import Documentation from "./documentation/pages/Documentation";
import UserForum from "./forum/pages/Forum";
import MainNavigation from "./shared /components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/userProfile" exact>
          <UserProfile />
        </Route>
        <Route path="/allQuizzes" exact>
          <Quizzes />
        </Route>
        <Route path="/documentation" exact>
          <Documentation />
        </Route>
        <Route path="/forum" exact>
          <UserForum />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
