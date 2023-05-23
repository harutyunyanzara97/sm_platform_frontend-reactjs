import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Routes, Route } from 'react-router-dom';

function App(props) {
  return (
    <div>
      <Router>
        <Route>
            <Route path="/" element={<Login />} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
