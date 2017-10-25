package com.fii.sorting.networks.security

import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler

import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    def static roleToUrl = ['ROLE_ADMIN' : '/admin',
                            'ROLE_USER': '/profile']

    @Override
    protected void handle(HttpServletRequest request, HttpServletResponse response,
                          Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to "
                    + targetUrl);
            return;
        }

        redirectStrategy.sendRedirect(request, response, targetUrl);
    }

    private static String determineTargetUrl(Authentication authentication) {
        roleToUrl.find({entry ->
            authentication.getAuthorities().find({
                it.role == entry.key
            })
        }).value
    }
}
