import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Box, FormControl, MenuItem, Select } from "@mui/material";
import "./index.css";
import html2canvas from "html2canvas";
import JSPDF from "jspdf";
import CheckValidation from "../../components/CheckValidation";
import { getReport } from "../../store/reportSlice";
import "../../assets/DesignSystem.css";
import AnalysisChart from "../../components/AnalysisChart";

const Report = () => {
  const dispatch = useDispatch();

  // 협의 후 수정필요
  //   const reportId = useSelector((state) => state.feedBackList.reportId);
  //   const reports = useSelector((state) => state.reports);
  //   const aiAnalysisList = useSelector((state) => state.aiAnalysisList);
  // 더미 데이터
  const [reports, setReports] = useState([
    {
      pageId: 0,
      studyName: "삼성전자 면접 스터디",
      feedBackList: [
        {
          question: "의사전달1",
          comment: [
            "전반1적으로 의미1는 잘 전달이 되었으나, 주제가 또렷하게 나타나지 않습니다.",
            "지난번 면접1보다는 많이 성장한 것이 보이지만 여전히 말하고자 하는 요지가 잘 드러나지는 않는 것 같아요.",
            "특1별히 피드백 없습니다.",
          ],
        },
        {
          question: "기업이해도1674",
          comment: [
            "회사1와 직무에 대해 잘 이해를 못하고 있다는 느낌을 받았습니다.",
            "사전조사1가 많이 부족하다는 느낌을 받았어요. 조금 더 리서치를 하고 이 분야에 관심이 많다는 것을 어필해야 할 것 같습니다. 기존의 경험들에서 이 직무와 회사와의 핏이 어떻게 연결되는지 그러한 부분들을 더 어필해주시면 더 좋은 점수를 받을 것 같습니다!",
            "특1별히 피드백 없습니다.",
          ],
        },
        {
          question: "기업이해도15475",
          comment: [
            "회사1와 직무에 대해 잘 이해를 못하고 있다는 느낌을 받았습니다.",
            "사전조사1가 많이 부족하다는 느낌을 받았어요. 조금 더 리서치를 하고 이 분야에 관심이 많다는 것을 어필해야 할 것 같습니다. 기존의 경험들에서 이 직무와 회사와의 핏이 어떻게 연결되는지 그러한 부분들을 더 어필해주시면 더 좋은 점수를 받을 것 같습니다!",
            "특1별히 피드백 없습니다.",
          ],
        },
        {
          question: "기업이해도14532",
          comment: [
            "회사1와 직무에 대해 잘 이해를 못하고 있다는 느낌을 받았습니다.",
            "사전조사1가 많이 부족하다는 느낌을 받았어요. 조금 더 리서치를 하고 이 분야에 관심이 많다는 것을 어필해야 할 것 같습니다. 기존의 경험들에서 이 직무와 회사와의 핏이 어떻게 연결되는지 그러한 부분들을 더 어필해주시면 더 좋은 점수를 받을 것 같습니다!",
            "특1별히 피드백 없습니다.",
          ],
        },
        {
          question: "기업이해도1136",
          comment: [
            "회사1와 직무에 대해 잘 이해를 못하고 있다는 느낌을 받았습니다.",
            "사전조사1가 많이 부족하다는 느낌을 받았어요. 조금 더 리서치를 하고 이 분야에 관심이 많다는 것을 어필해야 할 것 같습니다. 기존의 경험들에서 이 직무와 회사와의 핏이 어떻게 연결되는지 그러한 부분들을 더 어필해주시면 더 좋은 점수를 받을 것 같습니다!",
            "특1별히 피드백 없습니다.",
          ],
        },
        {
          question: "기업이해도13456",
          comment: [
            "회사1와 직무에 대해 잘 이해를 못하고 있다는 느낌을 받았습니다.",
            "사전조사1가 많이 부족하다는 느낌을 받았어요. 조금 더 리서치를 하고 이 분야에 관심이 많다는 것을 어필해야 할 것 같습니다. 기존의 경험들에서 이 직무와 회사와의 핏이 어떻게 연결되는지 그러한 부분들을 더 어필해주시면 더 좋은 점수를 받을 것 같습니다!",
            "특1별히 피드백 없습니다.",
          ],
        },
        {
          question: "기업이해도145",
          comment: [
            "회사1와 직무에 대해 잘 이해를 못하고 있다는 느낌을 받았습니다.",
            "사전조사1가 많이 부족하다는 느낌을 받았어요. 조금 더 리서치를 하고 이 분야에 관심이 많다는 것을 어필해야 할 것 같습니다. 기존의 경험들에서 이 직무와 회사와의 핏이 어떻게 연결되는지 그러한 부분들을 더 어필해주시면 더 좋은 점수를 받을 것 같습니다!",
            "특1별히 피드백 없습니다.",
          ],
        },
      ],
      aiAnalysisList: [
        {
          미소: 11,
          눈동자: 11,
        },
      ],
    },
    {
      pageId: 1,
      studyName: "삼성전자 면접 스터디",
      feedBackList: [
        {
          question: "의사전달2",
          comment: [
            "전반적2으로 의2미는 잘 전달이 되었으나, 주제가 또렷하게 나타나지 않습니다.",
            "지난번 2면접보다는 많2이 성장한 것이 보이지만 여전히 말하고자 하는 요지가 잘 드러나지는 않는 것 같아요.",
            "특2별히 피드2백 없습니다.",
          ],
        },
        {
          question: "기업이해도2",
          comment: [
            "회사와 직2무에 대해 잘 이해2를 못하고 있다는 느낌을 받았습니다.",
            "사2전조2사가 많이 부족하다는 느낌을 받았어요. 조금 더 리서치를 하고 이 분야에 관심이 많다는 것을 어필해야 할 것 같습니다. 기존의 경험들에서 이 직무와 회사와의 핏이 어떻게 연결되는지 그러한 부분들을 더 어필해주시면 더 좋은 점수를 받을 것 같습니다!",
            "2특2별히 피드백 없습니다.",
          ],
        },
      ],
      aiAnalysisList: [
        {
          미소: 22,
          눈동자: 22,
        },
      ],
    },
  ]);
  const [question, setQuestion] = useState(" ");
  const memberName = useSelector((state) => state.member.memberName);
  // PDF용 /////////////////
  const printDocument = () => {
    const input = document.getElementById("report");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new JSPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("report.pdf");
    });
  };

  const [page, setPage] = useState("0");

  const pageChange = (e) => {
    setPage(e.target.value);
  };

  useEffect(() => {
    dispatch(getReport(page));
  });
  return (
    <div>
      <CheckValidation />
      <div className="report" id="report">
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
        <div className="font-lg font-60 report-title">
          {reports[page].studyName}
        </div>
        {/* 리포트 선택 */}
        <Grid container className="report-select">
          <Grid xs={9}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                id="demo-select-small"
                value={page}
                label="Age"
                onChange={pageChange}
              >
                {reports.map((item) => (
                  <MenuItem value={item.pageId}>
                    Report {item.pageId + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2}>
            <button type="button" onClick={printDocument()}>
              pdf
            </button>
          </Grid>
        </Grid>

        <div className="font-md font-60 report-index">목차</div>
        <details>
          <summary className="font-sm font-60 report-index-title">
            AI 분석
          </summary>
          <div className="report-index-content">
            <a href="#confidence" className="font-sm font-60">
              &nbsp;자신감
            </a>
          </div>
          <div className="report-index-content">
            <a href="#calmness" className="font-sm font-60 ">
              &nbsp;침착함
            </a>
          </div>
          <div className="report-index-content">
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

          {reports[page].feedBackList.map((item) => (
            <div className="report-index-content">
              <a href={"#".concat(item.question)} className="font-sm font-60">
                &nbsp;{item.question}
              </a>
            </div>

            // to={format(item.question)}
            // <MenuItem>
            //   {item.feedBackList.map((item2) => (
            //     <a href={item2.question} className="font-sm font-60">
            //       {item2.question}
            //     </a>
            //   ))}
            // </MenuItem>
          ))}
        </details>
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
            className="report-content-box"
          >
            <Paper elevation={3} className="report-content-paper">
              <div
                className="font-md font-80 report-content-title"
                id="confidence"
              >
                자신감
              </div>
              <div className="font-sm font-40 report-content-detail">
                안정적인 눈동자의 움직임과 적절한 미소는 면접관에게 자신감 있는
                인상을 심어줍니다.
              </div>
              <div>
                <AnalysisChart className="report-content-paper-chart" />
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
            className="report-content-box"
          >
            <Paper elevation={3} className="report-content-paper">
              <div
                className="font-md font-80 report-content-title"
                id="calmness"
              >
                침착함
              </div>
              <div className="font-sm font-40 report-content-detail">
                안정적인 눈동자의 움직임과 적절한 미소는 면접관에게 자신감 있는
                인상을 심어줍니다.
              </div>
              <div>
                <AnalysisChart className="report-content-paper-chart" />
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
            className="report-content-box"
          >
            <Paper elevation={3} className="report-content-paper">
              <div
                className="font-md font-80 report-content-title"
                id="stability"
              >
                안정감
              </div>
              <div className="font-sm font-40 report-content-detail">
                안정적인 눈동자의 움직임과 적절한 미소는 면접관에게 자신감 있는
                인상을 심어줍니다.
              </div>
              <Grid container className="report-content-move">
                <Grid item container xs={6}>
                  <Grid xs={2} className="report-content-move-title font-50">
                    움직임 1
                  </Grid>
                  <Grid
                    xs={9}
                    item
                    className="report-content-move-content font-40"
                  >
                    분당 7회 움직임이 감지되었습니다. 합격자 대비 20% 적은
                    움직임이니 움직임에 많은 신경을 쏟을 필요는 없겠네요!
                  </Grid>
                </Grid>
                <Grid item container xs={6}>
                  <Grid xs={2} className="report-content-move-title font-50">
                    움직임 2
                  </Grid>
                  <Grid
                    xs={9}
                    item
                    className="report-content-move-content font-40"
                  >
                    분당 7회 움직임이 감지되었습니다. 합격자 대비 20% 적은
                    움직임이니 움직임에 많은 신경을 쏟을 필요는 없겠네요!
                  </Grid>
                </Grid>
                <Grid item container xs={6}>
                  <Grid xs={2} className="report-content-move-title font-50">
                    움직임 3
                  </Grid>
                  <Grid
                    xs={9}
                    item
                    className="report-content-move-content fonr-40"
                  >
                    분당 7회 움직임이 감지되었습니다. 합격자 대비 20% 적은
                    움직임이니 움직임에 많은 신경을 쏟을 필요는 없겠네요!
                  </Grid>
                </Grid>
                <Grid item container xs={6}>
                  <Grid
                    xs={2}
                    item
                    className="report-content-move-title font-50"
                  >
                    움직임 4
                  </Grid>
                  <Grid
                    xs={9}
                    item
                    className="report-content-move-content fonr-40"
                  >
                    분당 7회 움직임이 감지되었습니다. 합격자 대비 20% 적은
                    움직임이니 움직임에 많은 신경을 쏟을 필요는 없겠네요!
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </div>
        <div className="font-lg font-70 content-title" id="feedback">
          스터디원 피드백
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
            {reports[page].feedBackList.map((item) => (
              <div className=" report-content-box" id={item.question}>
                <p className="font-md font-70 report-content-question">
                  {item.question}
                </p>
                <div>
                  {item.comment.map((comments) => (
                    <Grid container className="report-content-comment">
                      <Grid xs={1.2} item className="font-sm font-30">
                        스터디원
                      </Grid>
                      <Grid xs={10.5} item className="font-sm font-50">
                        {comments}
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
  );
};

export default Report;
