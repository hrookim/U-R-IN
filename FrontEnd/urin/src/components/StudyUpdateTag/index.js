import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Grid } from "@mui/material";
import StudyUpdateTagButton from "../StudyUpdateTagButton";

const StudyUpdateTag = ({ getHashtags, getOverflowed, oldHashtags }) => {
  const [hashtags, setHashtags] = useState("");
  const [selected, setSelected] = useState(true);
  const [oldChecked, setOldChecked] = useState("");

  useEffect(() => {
    setOldChecked(oldHashtags);
    if (!hashtags) {
      setHashtags(oldChecked);
    }
  }, [oldHashtags]);

  useEffect(() => {
    getHashtags(hashtags);
    getOverflowed(false);
  }, [oldChecked, hashtags]);

  const getHashtagCode = (value) => {
    console.log("value===========", hashtags, value);
    if (value && !hashtags.includes(value)) {
      if (hashtags.length < 3) {
        setHashtags(hashtags + value);
        setSelected(true);
      } else {
        console.log("====================", hashtags);
        getHashtags(hashtags);
        getOverflowed(true);
      }
    } else {
      setHashtags(hashtags.replace(value, ""));
      setSelected(false);
    }
  };

  return (
    <div>
      <Grid container spacing="4">
        <Grid item>
          <StudyUpdateTagButton
            id="1"
            contents="IT/인터넷"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="2"
            contents="경영/기획/컨설팅"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="3"
            contents="교육"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="4"
            contents="금융/재무"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="5"
            contents="디자인"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="6"
            contents="마케팅/시장조사"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="7"
            contents="미디어/홍보"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="8"
            contents="법률/법무"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="9"
            contents="생산관리/품질관리"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="A"
            contents="서비스/고객지원"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="B"
            contents="연구개발"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="C"
            contents="영업/제휴"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="D"
            contents="인사/총무"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
        <Grid item>
          <StudyUpdateTagButton
            id="E"
            contents="전문직"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
            oldChecked={oldChecked}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default StudyUpdateTag;
