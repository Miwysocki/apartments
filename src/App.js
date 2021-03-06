import "./style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Details from "./pages/Details";
import { AuthProvider } from "./contexts/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import MyProfile from "./pages/MyProfile";
import UpdateProfile from "./pages/UpdateProfile";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import OffertForm from "./form/OffertForm";
import Search from "./pages/Search";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/log-in" element={<SignIn />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/room/:id" element={<Details />} />
            <Route exact path="/search/:searchedPhrase" element={<Search />} />

            <Route element={<PrivateRoute />}>
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
              <Route path="/host-place" element={<OffertForm />} />
              <Route path="/reservation/:id" element={<Reservation />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
