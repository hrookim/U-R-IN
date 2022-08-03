package com.dongpop.urin.domain.member.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MemberResponseDto {
    private int id;
    private String memberName;
    private String nickname;
}
