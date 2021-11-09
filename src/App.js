import "./App.css";
import Landing from "./components/Layout/Landing";
import Navbar from "./components/Layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Alert from "./components/Layout/Alert";
import PrivateRoute from "./routing/PrivateRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./actions/authAction";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddEducation from "./components/profile-form/AddEducation";
import AddExperience from "./components/profile-form/AddExperience";
import Profiles from "./components/Profiles/Profiles";
import ProfileDetail from "./components/ProfileDetail/ProfileDetail";
import Posts from "./components/Posts/Posts";
import PostDetail from "./components/PostDetail/PostDetail";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  console.log("ok");
  return (
    <Router>
      <Navbar></Navbar>
      <Route exact path="/" component={Landing}></Route>
      <section className="container">
        <Alert></Alert>
        <Switch>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/profiles" component={Profiles}></Route>
          <Route exact path="/profile/:id" component={ProfileDetail}></Route>

          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/edit-profile"
            component={EditProfile}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/add-education"
            component={AddEducation}
          ></PrivateRoute>
          <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
          <PrivateRoute
            exact
            path="/post/:id"
            component={PostDetail}
          ></PrivateRoute>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
