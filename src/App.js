import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ThingsToDo from "./pages/ThingsToDo/ThingsToDo";
import Home from "./pages/Home/Home";
import Book from "./pages/Book/Book";
import ViewBookings from "./pages/ViewBookings/ViewBookings";
import Navbar from "./components/universal/Navbar/Navbar";
import NotFound from "./pages/NotFound/NotFound";
import Checkout from "./pages/Checkout/Checkout";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import LoginTemp from "./pages/LoginTemp/LoginTemp";
// import RegisterTemp from "./pages/RegisterTemp/RegisterTemp";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/things-to-do" element={<NotFound />} />
            <Route exact path="/things-to-do/:city" element={<ThingsToDo />} />
            <Route exact path="/book/:experienceId" element={<Book />} />
            <Route
              exact
              path="/book/:experienceId/:variantId/checkout"
              element={<Checkout />}
            />
            <Route exact path="/book" element={<NotFound />} />
            {/* For the prototype temporary login using email is used for checking the bookings under the email */}
            <Route exact path="/view-bookings" element={<ViewBookings />} />
            {/*<Route exact path="/register" element={<Register />} /> */}
            {/* <Route exact path="/login" element={<LoginTemp />} /> */}
            {/* <Route exact path="/register" element={<RegisterTemp />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
