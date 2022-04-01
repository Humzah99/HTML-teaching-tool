import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/components/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const UserProfile = React.lazy(() => import('./user/pages/UserProfile'))
const Quizzes = React.lazy(() => import('./quiz/pages/Quizzes'))
const Documentation = React.lazy(() => import('./documentation/pages/Documentation'))
const UserForum = React.lazy(() => import('./forum/pages/Forum'))
const NewForumQuestion = React.lazy(() => import('./forum/pages/NewForumQuestion'))
const UpdateForumQuestion = React.lazy(() => import('./forum/pages/UpdateForumQuestion'))
const UserQuestions = React.lazy(() => import('./forum/pages/UserQuestions'))
const Auth = React.lazy(() => import('./user/pages/Auth'))
const ForumQuestion = React.lazy(() => import('./forum/pages/ForumQuestion'))
const NewQuiz = React.lazy(() => import('./quiz/pages/NewQuiz'))
const QuizLeaderboard = React.lazy(() => import('./quiz/pages/QuizLeaderboard'))
const ForgottenDetails = React.lazy(() => import('./user/pages/ForgottenDetails'))
const Homepage = React.lazy(() => import('./shared/components/Homepage/Homepage'))
const DocumentationRender = React.lazy(() => import('./documentation/pages/DocumentationRender'))
const UserScores = React.lazy(() => import('./user/pages/UserScores'))
const VerifyEmail = React.lazy(() => import('./user/pages/VerifyEmail'))
const ResetPassword = React.lazy(() => import('./user/pages/ResetPassword'))

function App() {

  const { token, login, logout, userId, username } = useAuth();

  let routes;
  if (token) {
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
        <Route path="/:quizId/high-scores" exact>
          <MainNavigation />
          <QuizLeaderboard />
        </Route>
        <Route path="/userProfile/:userId" exact>
          <MainNavigation />
          <UserProfile />
        </Route>
        <Route path="/userScores/:userId" exact>
          <MainNavigation />
          <UserScores />
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
        </Route>
        <Route path="/documentation/:docId" exact>
          <MainNavigation />
          <DocumentationRender />
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
      <Router><Suspense fallback={
      <div className="center">
        <LoadingSpinner />
      </div>
    }>{routes}</Suspense></Router>
    </AuthContext.Provider>
  );
}

export default App;
