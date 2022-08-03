import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
// import Meeting from "./pages/Meeting";
// import MyPage from "./pages/MyPage";
import StudyDetail from "./pages/StudyDetail";
import StudyCreationForm from "./pages/StudyCreationForm";
import StudyUpdateForm from "./pages/StudyUpdateForm";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import NavComponent from "./components/Navbar";

const App = () => {
  const privateAccess = !!localStorage.getItem("accessToken");
  const publicAccess = !privateAccess;
  // const [studyId, setStudyId] = useState(1);
  // const [meetingId, setMeetingId] = useState(1);

  // TODO: 토큰 확인 후 비로그인시 랜딩페이지로 이동하는 로직 추가
  //       로그인을 했어도 페이지에 대한 권한이 없을 경우 로직 추가(StudyUpdateForm, Meeting)
  //       404Page 추가

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

        {/* <Route path="/mypage/" element={<MyPage />} />
        <Route
          path="/study/:studyId/meeting/:meetingId"
          element={<Meeting />}
        /> */}
        <Route
          path="/intro"
          element={
            <PublicRoute
              authenticated={publicAccess}
              component={<LandingPage />}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
