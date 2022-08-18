import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Grid,
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import "./index.css";
import html2canvas from "html2canvas";
import JSPDF from "jspdf";
import { useParams, useNavigate } from "react-router-dom";
import CheckValidation from "../../components/CheckValidation";
import { getReport } from "../../store/reportSlice";
import { getMeeting } from "../../store/meetingSlice";
import "../../assets/DesignSystem.css";
import AnalysisChart from "../../components/AnalysisChart";

const Report = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 협의 후 수정필요
  const { studyId } = useParams();
  const [page, setPage] = useState("0");

  const pageChange = (e) => {
    setPage(e.target.value);
  };

  const reports = useSelector((state) => state.reports);
  // 차트변수
  const chartValueI = [reports.aiData.interviewee.emotion.confidence];
  const chartValueP = [reports.aiData.passUser.emotion.confidence];
  const chartValueIN = [
    reports.aiData.interviewee.emotion.calm,
    reports.aiData.interviewee.emotion.nervous,
  ];
  const chartValuePN = [
    reports.aiData.passUser.emotion.calm,
    reports.aiData.passUser.emotion.nervous,
  ];

  // const [question, setQuestion] = useState(" ");
  const memberName = useSelector((state) => state.member.memberName);
  const studyName = useSelector((state) => state.study.title);

  const meetingId = useSelector((state) => state.meeting.meetingIdList);

  // PDF용 /////////////////
  const printDocument = () => {
    const input = document.getElementById("report");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
      const pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new JSPDF("p", "mm");
      let position = 0;

      // 첫페이지
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 한페이지 이상
      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("report.pdf");
    });
  };
  // ////////////////////////
  useEffect(() => {
    dispatch(getMeeting({ studyId, navigate }));
  }, []);
  useEffect(() => {
    dispatch(getReport({ page, navigate }));
    // 변수설정
  }, [page]);

  return (
    <div>
      <CheckValidation />
      <div className="report">
        <div className="title-banner">
          <img
            src="/img/studyCreation.png"
            alt="bannerImg"
            className="report-wrap-img"
          />
          <div className="title-banner-title">
            <p className="font-lg font-70 title-banner-text1">나의 리포트</p>
            <p className="font-sm font-30 title-banner-text2">
              {memberName}님을 위해 준비한 리포트입니다. 실제 면접에서도 좋은
              성과 얻으시길 응원합니다!
            </p>
          </div>
        </div>
        {/* 스터디 명 가져오기 */}
        <div className="font-lg font-60 report-title">{studyName}</div>
        {/* 리포트 선택 */}
        <Grid container className="report-select">
          <Grid xs={10.5}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                id="demo-select-small"
                defaultValue={1}
                label="meetingId"
                onChange={(e) => {
                  pageChange(e);
                }}
              >
                {meetingId.map((item, index) => (
                  <MenuItem value={item.meetingId}>Report {index + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={1.2}>
            <Button onClick={printDocument}>pdf 내보내기</Button>
          </Grid>
        </Grid>

        <div className="font-md font-60 report-index">목차</div>
        <details>
          <summary className="font-sm font-60 report-index-title">
            AI 분석
          </summary>
          <div className="report-index-content-ai">
            <a href="#confidence" className="font-sm font-60">
              &nbsp;자신감
            </a>
          </div>
          <div className="report-index-content-ai">
            <a href="#calmness" className="font-sm font-60 ">
              &nbsp;침착함
            </a>
          </div>
          <div className="report-index-content-ai">
            <a href="#stability" className="font-sm font-60 ">
              &nbsp;안정감
            </a>
          </div>
        </details>

        <details>
          <summary className="font-sm font-60 report-index-title">
            피드백
          </summary>
          {/* 리포트 목차 */}

          {/* 인성 */}
          <details>
            <summary className="font-sm font-60 report-index-category">
              인성
            </summary>
            {reports.feedback.personality.map((item) => (
              <div className="report-index-content">
                <a
                  href={"#".concat(item.questionContent)}
                  className="font-sm font-60"
                >
                  &nbsp;{item.questionContent}
                </a>
              </div>
            ))}
          </details>
          {/* 적성 */}
          <details>
            <summary className="font-sm font-60 report-index-category">
              적성
            </summary>
            {reports.feedback.tech.map((item) => (
              <div className="report-index-content">
                <a
                  href={"#".concat(item.questionContent)}
                  className="font-sm font-60"
                >
                  &nbsp;{item.questionContent}
                </a>
              </div>
            ))}
          </details>
        </details>
        <div id="report">
          <div className="report-content">
            <div className="font-lg font-70 content-title">AI 분석</div>
            {/* 자신감 */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  backgroundColor: "#F2F2F2",
                },
              }}
              className="report-content-box-ai"
            >
              <Paper elevation={3} className="report-content-paper">
                <div
                  className="font-md font-80 report-content-title"
                  id="confidence"
                >
                  자신감
                </div>
                <div className="font-sm font-40 report-content-detail">
                  안정적인 표정처리와 적절한 미소는 면접관에게 자신감 있는
                  인상을 전달 할 수 있어요!
                </div>
                <div>
                  <AnalysisChart
                    category={["자신감"]}
                    interviewee={chartValueI}
                    passUser={chartValueP}
                    height={150}
                    className="report-content-paper-chart"
                  />
                </div>
              </Paper>
            </Box>
            {/* 침착함 */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  backgroundColor: "#F6F6F9",
                },
              }}
              className="report-content-box-ai"
            >
              <Paper elevation={3} className="report-content-paper">
                <div
                  className="font-md font-80 report-content-title"
                  id="calmness"
                >
                  침착함
                </div>
                <div className="font-sm font-40 report-content-detail">
                  긴장없이 일관적으로 평온한 태도는 면접관에게 차분한 인상을
                  심어줄꺼에요!
                </div>
                <div>
                  <AnalysisChart
                    category={["평온함", "긴장"]}
                    interviewee={chartValueIN}
                    passUser={chartValuePN}
                    height={250}
                    className="report-content-paper-chart"
                  />
                </div>
              </Paper>
            </Box>
            {/* 안정감 */}
            <Box
              sx={{
                "& > :not(style)": {
                  backgroundColor: "#F6F6F9",
                },
              }}
              className="report-content-box-ai"
            >
              <Paper elevation={3} className="report-content-paper">
                <div
                  className="font-md font-80 report-content-title"
                  id="stability"
                >
                  안정감
                </div>
                <div className="font-sm font-40 report-content-detail">
                  안정적인 자세와 적절한 제스쳐 사용은 면접관에게 효과적으로
                  자신을 어필할 수 있어요!
                </div>

                <Grid container className="report-content-move">
                  <Grid item container xs={6}>
                    <Grid
                      xs={2}
                      item
                      className="report-content-move-title font-50"
                    >
                      {reports.aiData.interviewee.poseDataList[0].name}
                    </Grid>
                    <Grid
                      xs={9}
                      item
                      className="report-content-move-content font-40"
                    >
                      분당 {reports.aiData.interviewee.poseDataList[0].count}회
                      움직임이 감지되었습니다. 합격자는 평균{" "}
                      {reports.aiData.passUser.poseDataList[0].count}회의
                      움직임을 보였어요.
                    </Grid>
                  </Grid>
                  <Grid item container xs={6}>
                    <Grid
                      xs={2}
                      item
                      className="report-content-move-title font-50"
                    >
                      {reports.aiData.interviewee.poseDataList[1].name}
                      {/* /{reports.aiData.interviewee.poseDataList[1].name} */}
                    </Grid>
                    <Grid
                      xs={9}
                      item
                      className="report-content-move-content font-40"
                    >
                      분당 {reports.aiData.interviewee.poseDataList[1].count}회
                      움직임이 감지되었습니다. 합격자는 평균{" "}
                      {reports.aiData.passUser.poseDataList[1].count}회의
                      움직임을 보였어요.
                    </Grid>
                  </Grid>
                  <Grid item container xs={6}>
                    <Grid
                      xs={2}
                      item
                      className="report-content-move-title font-50"
                    >
                      {reports.aiData.interviewee.poseDataList[2].name}
                      {/* {reports.aiData.interviewee.poseDataList[2].name} */}
                    </Grid>
                    <Grid
                      xs={9}
                      item
                      className="report-content-move-content font-40"
                    >
                      분당 {reports.aiData.interviewee.poseDataList[2].count}회
                      움직임이 감지되었습니다. 합격자는 평균{" "}
                      {reports.aiData.passUser.poseDataList[2].count}회의
                      움직임을 보였어요.
                    </Grid>
                  </Grid>
                  <Grid item container xs={6}>
                    <Grid
                      xs={2}
                      item
                      className="report-content-move-title font-50"
                    >
                      {reports.aiData.interviewee.poseDataList[3].name}
                      {/* {reports.aiData.interviewee.poseDataList[3].name} */}
                    </Grid>
                    <Grid
                      xs={9}
                      item
                      className="report-content-move-content font-40"
                    >
                      분당 {reports.aiData.interviewee.poseDataList[3].count}회
                      움직임이 감지되었습니다. 합격자는 평균{" "}
                      {reports.aiData.passUser.poseDataList[3].count}회의
                      움직임을 보였어요.
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </div>
          <div className="font-lg font-70 content-title" id="feedback">
            스터디원 피드백
          </div>
          <div className="font-md font-50 content-title" id="feedback">
            인성면접
          </div>
          <div className="report-content">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  backgroundColor: "#F6F6F9",
                },
              }}
              className="report-content-feedback-box"
            >
              {reports.feedback.personality.map((item) => (
                <div className=" report-content-box" id={item.questionContent}>
                  <p className="font-md font-70 report-content-question">
                    {item.questionContent}
                  </p>
                  <div>
                    {item.answerContentList.map((comments) => (
                      <Grid container className="report-content-comment">
                        <Grid xs={1.2} item className="font-sm font-30">
                          {comments.interviewer}
                        </Grid>
                        <Grid xs={10.5} item className="font-sm font-50">
                          {comments.content}
                        </Grid>
                      </Grid>
                    ))}
                  </div>
                </div>
              ))}
            </Box>
          </div>
          <div className="font-md font-50 content-title" id="feedback">
            적성면접
          </div>
          <div className="report-content">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  backgroundColor: "#F6F6F9",
                },
              }}
              className="report-content-feedback-box"
            >
              {reports.feedback.tech.map((item) => (
                <div className=" report-content-box" id={item.questionContent}>
                  <p className="font-md font-70 report-content-question">
                    {item.questionContent}
                  </p>
                  <div>
                    {item.answerContentList.map((comments) => (
                      <Grid container className="report-content-comment">
                        <Grid xs={1.2} item className="font-sm font-30">
                          {comments.interviewer}
                        </Grid>
                        <Grid xs={10.5} item className="font-sm font-50">
                          {comments.content}
                        </Grid>
                      </Grid>
                    ))}
                  </div>
                </div>
              ))}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
