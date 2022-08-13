import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Button, Chip, Grid, Item, Stack } from "@mui/material";
import SearchButton from "../SearchButton";

const SearchFilter = ({ getHashtag, hashtagCnt }) => {
  const [hashtag, setHashtag] = useState("");
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    getHashtag([hashtag, selected]);
  }, [hashtag]);

  const getHashtagCode = (value) => {
    if (!hashtag.includes(value)) {
      if (hashtag.length <= 3) {
        setHashtag(hashtag + value);
        setSelected(true);
      }
    } else {
      setHashtag(hashtag.replace(value, ""));
      console.log("언셀렉 하는데 왜 안돼");
      setSelected(false);
    }
  };

  console.log(hashtagCnt, "=======");
  return (
    <div>
      <Stack direction="row" spacing="4">
        <SearchButton
          id="1"
          hashtagCnt={hashtagCnt}
          contents="IT/인터넷"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="2"
          hashtagCnt={hashtagCnt}
          contents="경영/기획/컨설팅"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="3"
          hashtagCnt={hashtagCnt}
          contents="교육"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="4"
          hashtagCnt={hashtagCnt}
          contents="금융/재무"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="5"
          hashtagCnt={hashtagCnt}
          contents="디자인"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="6"
          hashtagCnt={hashtagCnt}
          contents="마케팅/시장조사"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="7"
          hashtagCnt={hashtagCnt}
          contents="미디어/홍보"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="8"
          hashtagCnt={hashtagCnt}
          contents="법률/법무"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="9"
          hashtagCnt={hashtagCnt}
          contents="생산관리/품질관리"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="A"
          hashtagCnt={hashtagCnt}
          contents="서비스/고객지원"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="B"
          hashtagCnt={hashtagCnt}
          contents="연구개발"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="C"
          hashtagCnt={hashtagCnt}
          contents="영업/제휴"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="D"
          hashtagCnt={hashtagCnt}
          contents="인사/총무"
          getHashtagCode={getHashtagCode}
        />
        <SearchButton
          id="E"
          hashtagCnt={hashtagCnt}
          contents="전문직"
          getHashtagCode={getHashtagCode}
        />
      </Stack>
    </div>
  );
};

export default SearchFilter;
