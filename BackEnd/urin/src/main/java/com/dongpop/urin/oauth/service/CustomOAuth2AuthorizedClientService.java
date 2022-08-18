package com.dongpop.urin.oauth.service;

import com.dongpop.urin.oauth.entity.OAuth2Client;
import com.dongpop.urin.oauth.repository.OAuth2AuthorizedClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomOAuth2AuthorizedClientService implements OAuth2AuthorizedClientService {

    private final OAuth2AuthorizedClientRepository oAuth2AuthorizedClientRepository;

    @Override
    public void saveAuthorizedClient(OAuth2AuthorizedClient oAuth2AuthorizedClient, Authentication authentication) {
        String clientRegistrationId = oAuth2AuthorizedClient.getClientRegistration().getRegistrationId();
        String principalName = oAuth2AuthorizedClient.getPrincipalName();
        String accessToken = oAuth2AuthorizedClient.getAccessToken().getTokenValue();
        String refreshToken = "";
        if (oAuth2AuthorizedClient.getRefreshToken() != null) {
            refreshToken = oAuth2AuthorizedClient.getRefreshToken().getTokenValue();
        }

        OAuth2Client oAuth2Client = OAuth2Client.builder()
                .clientRegistrationId(clientRegistrationId)
                .principalName(principalName)
                .accessToken(accessToken)
                .refreshtoken(refreshToken).build();
        oAuth2AuthorizedClientRepository.save(oAuth2Client);
    }

    @Override
    public <T extends OAuth2AuthorizedClient> T loadAuthorizedClient(String clientRegistrationId, String principalName) {
        return null;
    }

    @Override
    public void removeAuthorizedClient(String clientRegistrationId, String principalName) {
        return;
    }
}
