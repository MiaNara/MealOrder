import "./App.css";
import ListCategory from "./components/category/ListCategory";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import { Route, Routes } from "react-router-dom";
import Bills from "./components/bill/Bills";
import { UserProvider } from "./components/context/UserContext";
import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Report from "./components/category/Report";
import Collection from "./components/category/Collection";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <ToastContainer autoClose={1500} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected role={0}><Bills /></Protected>} />
          <Route path="/category" element={<Protected role={1}><ListCategory /></Protected>} />
          <Route path="/report" element={<Protected role={1}><Report /></Protected>} />
          <Route path="/addCategory" element={<Protected role={1}><Collection /></Protected>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
