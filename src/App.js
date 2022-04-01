import React from "react";
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
import QuizLeaderboard from "./quiz/pages/QuizLeaderboard";
import ForgottenDetails from "./user/pages/ForgottenDetails";
import Homepage from './shared/components/Homepage/Homepage';
import DocumentationRender from "./documentation/pages/DocumentationRender";
import { useAuth } from "./shared/hooks/auth-hook";
import UserScores from "./user/pages/UserScores";
import VerifyEmail from "./user/pages/VerifyEmail";
import ResetPassword from "./user/pages/ResetPassword";
import Footer from "./shared/components/Footer/Footer";

function App() {

  const { token, login, logout, userId, username } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/documentation" exact>
          <MainNavigation />
          <Documentation />
          <Footer />
        </Route>
        <Route path="/forum" exact>
          <MainNavigation />
          <UserForum />
          <Footer />
        </Route>
        <Route path="/forum/new" exact>
          <MainNavigation />
          <NewForumQuestion />
          <Footer />
        </Route>
        <Route path="/forum/view/:questionId" exact>
          <MainNavigation />
          <ForumQuestion />
          <Footer />
        </Route>
        <Route path="/forum/user/:userId" exact>
          <MainNavigation />
          <UserQuestions />
          <Footer />
        </Route>
        <Route path="/forum/update/:questionId" exact>
          <MainNavigation />
          <UpdateForumQuestion />
          <Footer />
        </Route>
        <Route path="/" exact>
          <MainNavigation />
          <Homepage />
          <Footer />
        </Route>
        <Route path="/quiz" exact>
          <MainNavigation />
          <Quizzes />
          <Footer />
        </Route>
        <Route path="/quiz/:quizId" exact>
          <MainNavigation />
          <NewQuiz />
          <Footer />
        </Route>
        <Route path="/:quizId/high-scores" exact>
          <MainNavigation />
          <QuizLeaderboard />
          <Footer />
        </Route>
        <Route path="/userProfile/:userId" exact>
          <MainNavigation />
          <UserProfile />
          <Footer />
        </Route>
        <Route path="/userScores/:userId" exact>
          <MainNavigation />
          <UserScores />
          <Footer />
        </Route>
        <Route path="/documentation/:docId" exact>
          <MainNavigation />
          <DocumentationRender />
          <Footer />
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
          <Footer />
        </Route>
        <Route path="/forum" exact>
          <MainNavigation />
          <UserForum />
          <Footer />
        </Route>
        <Route path="/forum/view/:questionId" exact>
          <MainNavigation />
          <ForumQuestion />
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
          <Footer />
        </Route>
        <Route path="/documentation/:docId" exact>
          <MainNavigation />
          <DocumentationRender />
          <Footer />
        </Route>
        <Route path="/verifyEmail/:token" exact>
          <VerifyEmail />
        </Route>
        <Route path="/resetPassword/:token" exact>
          <ResetPassword />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, login: login, logout: logout, userId: userId, username: username }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
