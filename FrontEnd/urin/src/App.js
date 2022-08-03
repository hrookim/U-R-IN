import React, { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import NavComponent from "./components/Navbar";
import { checkValidation } from "./store/checkValidationSlice";

const App = () => {
  const privateAccess = !!localStorage.getItem("accessToken");
  const memberId = localStorage.getItem("accessToken");
  const publicAccess = !privateAccess;

  const dispatch = useDispatch();
  const validation = useSelector((state) => state.validation);

  // useParams는 react-router와 관련
  // 현재 위치가 /study/:studyId이기 때문에
  // : 뒤에 있는 studyId를 가져올 수 있음

  // useEffect의 첫번째 인자: 컴퍼넌트가 mounted, updated, unmounted될 때 수행할 함수
  // 최초 진입시 컴퍼넌트의 study는 initialState상태(정보가 없는 상태)이므로 dispatch로 데이터를 불러와야 함
  // useEffect의 두번째 인자:
  // 없는 경우, 빈 배열, 배열 안에 의존값 => https://react.vlpt.us/basic/16-useEffect.html
  useEffect(() => {
    dispatch(checkValidation(memberId));
  }, []);

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
