package com.dongpop.urin.domain.feed.dto.handler;

import com.dongpop.urin.oauth.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.dongpop.urin.oauth.token.TokenProperties;
import com.dongpop.urin.oauth.token.TokenService;
import com.dongpop.urin.oauth.token.TokenSet;
import com.dongpop.urin.oauth.util.CookieUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.dongpop.urin.oauth.repository.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenService tokenService;
    private final TokenProperties tokenProperties;
    private final ObjectMapper objectMapper;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("====== [Entry onAuthenticationSuccess] ======");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Long id = (Long) attributes.get("id");
        String email = "";
        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
        if ((Boolean) kakao_account.get("has_email")) {
            email = (String) kakao_account.get("email");
        }
        String identifier = email + id;

        TokenSet tokenSet = tokenService.issueNewToken(identifier);

        String targetUrl = makeRedirectUrl(request, tokenSet.getAccess());
        log.info("Redirect_url = {}", targetUrl);
        if (response.isCommitted()) {
            log.debug("Response is already committed. Can't redirect {}", targetUrl);
            return;
        }

        String accessTokenName = tokenProperties.getAccess().getName();
        CookieUtils.addCookie(response, accessTokenName,
                tokenSet.getRefresh(), (int) tokenProperties.getRefresh().getExpiredTime());

        Map<String, String> map = new HashMap<>();
        map.put(accessTokenName, tokenSet.getAccess());
        response.getWriter().println(objectMapper.writeValueAsString(map));

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private String makeRedirectUrl(HttpServletRequest request, String token) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .build().toUriString();
    }

}
