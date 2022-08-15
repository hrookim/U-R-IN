import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Grid } from "@mui/material";
import SearchButton from "../SearchButton";

const SearchFilter = ({ getHashtags, getOverflowed, oldHashtags }) => {
  const [hashtags, setHashtags] = useState("");
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    getHashtags(hashtags);
    getOverflowed(false);
  }, [hashtags]);

  const getHashtagCode = (value) => {
    if (!hashtags.includes(value)) {
      if (hashtags.length < 3) {
        setHashtags(hashtags + value);
        setSelected(true);
      } else {
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
          <SearchButton
            id="1"
            contents="IT/인터넷"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="2"
            contents="경영/기획/컨설팅"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="3"
            contents="교육"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="4"
            contents="금융/재무"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="5"
            contents="디자인"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="6"
            contents="마케팅/시장조사"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="7"
            contents="미디어/홍보"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="8"
            contents="법률/법무"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="9"
            contents="생산관리/품질관리"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="A"
            contents="서비스/고객지원"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="B"
            contents="연구개발"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="C"
            contents="영업/제휴"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="D"
            contents="인사/총무"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
        <Grid item>
          <SearchButton
            id="E"
            contents="전문직"
            getHashtagCode={getHashtagCode}
            hashtags={hashtags}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchFilter;
