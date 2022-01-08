import "./style/App.css";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Details from "./components/Details";
import { AuthProvider } from "./contexts/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/log-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/room/:id" element={<Details />} />
          {/* <Route exact path="/login" element={<Login />} /> */}
          {/* <Route
            exact
            path="/recovery-password"
            element={<RecoveryPassword />}
          />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
