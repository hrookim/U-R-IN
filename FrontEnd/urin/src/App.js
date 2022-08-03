import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import Meeting from "./pages/Meeting";
// import MyPage from "./pages/MyPage";
import StudyDetail from "./pages/StudyDetail";
import StudyCreationForm from "./pages/StudyCreationForm";
import StudyUpdateForm from "./pages/StudyUpdateForm";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

const App = () => {
  // TODO: 토큰 확인 후 비로그인시 랜딩페이지로 이동하는 로직 추가
  //       로그인을 했어도 페이지에 대한 권한이 없을 경우 로직 추가(StudyUpdateForm, Meeting)
  //       404Page 추가

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/intro" element={<LandingPage />} />
        <Route path="/study/create" element={<StudyCreationForm />} />
        <Route path="/study/:studyId" element={<StudyDetail />} />
        <Route path="/study/:studyId/edit" element={<StudyUpdateForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/mypage/" element={<MyPage />} />
        <Route
          path="/study/:studyId/meeting/:meetingId"
          element={<Meeting />}
        /> */}
        <Route path="/meeting" element={<Meeting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
