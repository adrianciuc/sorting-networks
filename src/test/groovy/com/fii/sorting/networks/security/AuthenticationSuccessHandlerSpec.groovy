package com.fii.sorting.networks.security

import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import spock.lang.Specification

class AuthenticationSuccessHandlerSpec extends Specification {

    def 'should redirect to profile page based on user role' () {
        given:
            def url
        when:
            url = AuthenticationSuccessHandler.invokeMethod(
                    'determineTargetUrl',
                    new AnonymousAuthenticationToken(
                            'some_key',
                            'some_principal',
                            [new SimpleGrantedAuthority('ROLE_USER')]
                    ))
        then:
            assert '/profile' == url
    }

    def 'should redirect to admin page based on admin role' () {
        given:
        def url
        when:
        url = AuthenticationSuccessHandler.invokeMethod(
                'determineTargetUrl',
                new AnonymousAuthenticationToken(
                        'some_key',
                        'some_principal',
                        [new SimpleGrantedAuthority('ROLE_ADMIN')]
                ))
        then:
        assert '/admin' == url
    }
}
