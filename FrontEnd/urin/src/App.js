import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
// import Meeting from "./pages/Meeting";
// import MyPage from "./pages/MyPage";
import StudyDetail from "./pages/StudyDetail";
import StudyCreationForm from "./pages/StudyCreationForm";
import StudyUpdateForm from "./pages/StudyUpdateForm";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Meeting from "./pages/Meeting";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import NavComponent from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import Report from "./pages/Report";

const App = () => {
  const [privateAccess, setPrivateAccess] = useState(false);

  useEffect(() => {
    setPrivateAccess(!!localStorage.getItem("accessToken"));
  }, []);

  const publicAccess = !privateAccess;

  return (
    <Router>
      <NavComponent />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute
              authenticated={privateAccess}
              component={<MainPage />}
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute
              authenticated={privateAccess}
              component={<MyPage />}
            />
          }
        />
        <Route
          path="/study/create"
          element={
            <PrivateRoute
              authenticated={privateAccess}
              component={<StudyCreationForm />}
            />
          }
        />
        <Route
          path="/study/:studyId"
          element={
            <PrivateRoute
              authenticated={privateAccess}
              component={<StudyDetail />}
            />
          }
        />
        <Route
          path="/study/:studyId/edit"
          element={
            <PrivateRoute
              authenticated={privateAccess}
              component={<StudyUpdateForm />}
            />
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute
              authenticated={privateAccess}
              component={<Report />}
            />
          }
        />

        <Route
          path="/intro"
          element={
            <PublicRoute
              authenticated={publicAccess}
              component={<LandingPage />}
            />
          }
        />

        {/* validation이 필요 없는 페이지 */}
        <Route path="/study/:studyId/meeting/" element={<Meeting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
