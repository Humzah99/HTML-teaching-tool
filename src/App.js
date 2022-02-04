import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import UserProfile from "./user/pages/UserProfile";
import Codepen from "./documentation/pages/Codepen";
import Quizzes from "./quiz/pages/Quizzes";
import Documentation from "./documentation/pages/Documentation";
import UserForum from "./forum/pages/Forum";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewForumQuestion from "./forum/pages/NewForumQuestion";
import UpdateForumQuestion from "./forum/pages/UpdateForumQuestion";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/components/context/auth-context";
import ForumQuestion from "./forum/pages/ForumQuestion";
import NewQuiz from "./quiz/pages/NewQuiz";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/documentation" exact>
          <MainNavigation />
          <Documentation />
        </Route>
        <Route path="/forum" exact>
          <MainNavigation />
          <UserForum />
        </Route>
        <Route path="/forum/new" exact>
          <MainNavigation />
          <NewForumQuestion />
        </Route>
        <Route path="/forum/view/:questionId" exact>
          <MainNavigation />
          <ForumQuestion />
        </Route>
        <Route path="/forum/update/:questionId" exact>
          <MainNavigation />
          <UpdateForumQuestion />
        </Route>
        <Route path="/" exact>
          <MainNavigation />
        </Route>
        <Route path="/allQuizzes" exact>
          <MainNavigation />
          <Quizzes />
        </Route>
        <Route path="/quiz/:quizId" exact>
          <MainNavigation />
          <NewQuiz />
        </Route>
        <Route path="/userProfile/:userId" exact>
          <MainNavigation />
          <UserProfile />
        </Route>
        <Route path="/documentation/:docId" exact>
          <MainNavigation />
          <Codepen />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/documentation" exact>
          <MainNavigation />
          <Documentation />
        </Route>
        <Route path="/forum" exact>
          <MainNavigation />
          <UserForum />
        </Route>
        <Route path="/forum/new" exact>
          <MainNavigation />
          <NewForumQuestion />
        </Route>
        <Route path="/forum/view/:questionId" exact>
          <MainNavigation />
          <ForumQuestion />
        </Route>
        <Route path="/forum/update/:questionId" exact>
          <MainNavigation />
          <UpdateForumQuestion />
        </Route>
        <Route path="/userProfile/:userId" exact>
          <MainNavigation />
          <UserProfile />
        </Route>
        <Route path="/quiz/:quizId" exact>
          <MainNavigation />
          <NewQuiz />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/" exact>
          <MainNavigation />
        </Route>
        <Route path="/documentation/:docId" exact>
          <MainNavigation />
          <Codepen />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
