import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import UserProfile from "./user/pages/UserProfile";
import Quizzes from "./quiz/pages/Quizzes";
import Documentation from "./documentation/pages/Documentation";
import UserForum from "./forum/pages/Forum";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewForumQuestion from "./forum/pages/NewForumQuestion";
import UpdateForumQuestion from "./forum/pages/UpdateForumQuestion";
import UserQuestions from "./forum/pages/UserQuestions";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/components/context/auth-context";
import ForumQuestion from "./forum/pages/ForumQuestion";
import NewQuiz from "./quiz/pages/NewQuiz";
import ForgottenDetails from "./user/pages/ForgottenDetails";
import Homepage from './shared/components/Homepage/Homepage';
import DocumentationRender from "./documentation/pages/DocumentationRender";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(false);
  const [userId, setUserId] = useState(false);
  const login = useCallback((uname, uid) => {
    setIsLoggedIn(true);
    setUsername(uname);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername(null);
    setUserId(null);
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
        <Route path="/forum/user/:userId" exact>
          <MainNavigation />
          <UserQuestions />
        </Route>
        <Route path="/forum/update/:questionId" exact>
          <MainNavigation />
          <UpdateForumQuestion />
        </Route>
        <Route path="/" exact>
          <MainNavigation />
          <Homepage />
        </Route>
        <Route path="/quiz" exact>
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
          <DocumentationRender />
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
        <Route path="/forum/user/:userId" exact>
          <MainNavigation />
          <UserQuestions />
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
        <Route path="/forgottenDetails" exact>
          <ForgottenDetails />
        </Route>
        <Route path="/" exact>
          <MainNavigation />
          <Homepage />
        </Route>
        <Route path="/documentation/:docId" exact>
          <MainNavigation />
          <DocumentationRender />
        </Route>
        <Redirect to="/auth" /> 
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, username: username, userId: userId, login: login, logout: logout }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
