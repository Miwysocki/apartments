import "./style/App.css";
import Home from "./Home";
// import Header from "./Header";
// import Banner from "./Banner";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Details from "./components/Details";
function App() {
  return (
    // <div className="App">
    //   <Header />
    //   <Banner />
    //   <Home />
    // </div>
    // <Routes>
    //   {/* <Route path="/about"></Route>
    //   <Route path="/users"></Route>
    //   <Route path="/">
    //     <Home />
    //   </Route> */}
    //   <Route path="/" element={<Home />} />
    // </Routes>

    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/log-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
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
  );
}

export default App;
