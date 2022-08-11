package com.dongpop.urin.oauth.entity;

import com.dongpop.urin.domain.common.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "oauth2_clients")
public class OAuth2Client extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String clientRegistrationId;
    private String principalName;
    private String accessToken;
    private String refreshtoken;

    @Builder
    public OAuth2Client(String clientRegistrationId, String principalName, String accessToken, String refreshtoken) {
        this.clientRegistrationId = clientRegistrationId;
        this.principalName = principalName;
        this.accessToken = accessToken;
        this.refreshtoken = refreshtoken;
    }
}
/**
 * CREATE TABLE oauth2_authorized_client (
 *   client_registration_id varchar(100) NOT NULL,
 *   principal_name varchar(200) NOT NULL,
 *   access_token_type varchar(100) NOT NULL,
 *   access_token_value blob NOT NULL,
 *   access_token_issued_at timestamp NOT NULL,
 *   access_token_expires_at timestamp NOT NULL,
 *   access_token_scopes varchar(1000) DEFAULT NULL,
 *   refresh_token_value blob DEFAULT NULL,
 *   refresh_token_issued_at timestamp DEFAULT NULL,
 *   created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
 *   PRIMARY KEY (client_registration_id, principal_name)
 * );
 */
