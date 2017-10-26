package com.fii.sorting.networks

import com.fii.sorting.networks.repository.JpaPersistentTokenRepository
import com.fii.sorting.networks.security.AuthenticationSuccessHandler
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.support.StaticMessageSource
import org.springframework.security.access.vote.AffirmativeBased
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor

@EnableWebSecurity
class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService

    @Autowired
    private DaoAuthenticationProvider authenticationProvider

    @Autowired
    private JpaPersistentTokenRepository persistentTokenRepository

    @Autowired
    private AuthenticationSuccessHandler authenticationSuccessHandler

    @Override
    void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder())
                .and()
                .authenticationProvider(authenticationProvider)
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/")
                .permitAll()
                .antMatchers("/profile", "/profile/**")
                .access("hasRole('USER')")
                .and()
                .authorizeRequests()
                .antMatchers("/admin", "/admin/**")
                .access("hasRole('ADMIN')")
                .and()
                .authorizeRequests()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .successHandler(authenticationSuccessHandler)
                .usernameParameter("email")
                .passwordParameter("password")
                .and()
                .rememberMe()
                .rememberMeParameter("remember")
                .tokenRepository(persistentTokenRepository)
                .tokenValiditySeconds(86400)
                .and()
                .csrf()
                .and()
                .exceptionHandling()
                .accessDeniedPage("/unauthorized")
                .and()
                .logout()
                .logoutSuccessUrl("/")
    }

    @Override
    void init(final WebSecurity web) throws Exception {
        final HttpSecurity http = getHttp()
        web.addSecurityFilterChainBuilder(http).postBuildAction({
            FilterSecurityInterceptor securityInterceptor =
                    http.getSharedObject(FilterSecurityInterceptor.class)
            ((AffirmativeBased)(securityInterceptor.getAccessDecisionManager()))
                    .setMessageSource(new StaticMessageSource())
            web.securityInterceptor(securityInterceptor)
        })
    }

    @Override
    void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers( "/css/**", "/fonts/**", "/js/**", "/img/**")
    }
}
