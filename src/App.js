import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./features/User/Authentication/Login";
import Signup from "./features/User/Authentication/Signup";
import AuthComponent from "./app/AuthComponent";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser, getAllUserData } from "./features/User/userSlice";
import { getFromLocal } from "./helpers/jwt";
import Dashboard from "./features/Event/ShowEvents/Events";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import PersonalDetails from "./features/User/UserDetails/PersonalDetails";

function App() {
  /**fetch details if user exists and store in redux */
  const dispatch = useDispatch();
  useEffect(() => {
    if (getFromLocal("USER")) {
      dispatch(fetchUser());
      dispatch(getAllUserData());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {/* Container component for toast notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <NavigationBar />
        <Switch>
          {/* Unauthenticated routes */}
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          {/* Authenticated Routes */}
          <AuthComponent>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/personalDetails" component={PersonalDetails} />
          </AuthComponent>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
