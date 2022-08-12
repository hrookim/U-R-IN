import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Card, Box, FormControl, MenuItem, Select } from "@mui/material";
import "./index.css";
import CheckValidation from "../../components/CheckValidation";
import { getReport } from "../../store/reportSlice";
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
          question: "기업이해도1",
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

  const memberName = useSelector((state) => state.member.memberName);
  // /////////////////

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
        <div className="font-lg font-60 report-title">
          {reports[page].studyName}
        </div>
        {/* 리포트 선택 */}
        <div className="report-select">
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
        </div>
        <hr />

        <div className="font-lg font-70 content-title">스터디원 피드백</div>
        <div className="report-content">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                width: 1100,
                backgroundColor: "#F2F2F2",
              },
            }}
            className="report-content-box"
          >
            {reports[page].feedBackList.map((item) => (
              <Paper elevation={3}>
                <div className="font-lg font-50 report-content-question">
                  {item.question}
                </div>

                {item.comment.map((comments) => (
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      mx: "2px",
                      transform: "scale(0.85)",
                    }}
                    className="font-30 font-sm"
                  >
                    <Card>{comments}</Card>
                  </Box>
                ))}
              </Paper>
            ))}
          </Box>
        </div>
        <div className="report-content">
          <div className="font-lg font-70 content-title">AI 분석</div>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                width: 1100,
                backgroundColor: "#F2F2F2",
              },
            }}
            className="report-content-box"
          >
            {" "}
            <Paper elevation={3}>
              <div className="report-content-paper">
                <AnalysisChart className="report-content-paper-chart" />
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Report;
