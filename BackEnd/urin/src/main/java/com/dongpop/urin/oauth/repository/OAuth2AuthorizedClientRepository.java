package com.dongpop.urin.oauth.repository;

import com.dongpop.urin.oauth.entity.OAuth2Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OAuth2AuthorizedClientRepository extends JpaRepository<OAuth2Client, Integer> {
    OAuth2Client findByClientRegistrationIdEqualsAndPrincipalNameEquals(String clientRegistrationId, String principalName);
}
