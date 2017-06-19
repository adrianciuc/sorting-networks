package com.fii.sorting.networks

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.MessageSource
import org.springframework.context.annotation.Bean
import org.springframework.context.support.StaticMessageSource
import org.springframework.security.access.vote.AffirmativeBased
import org.springframework.security.authentication.AuthenticationTrustResolver
import org.springframework.security.authentication.AuthenticationTrustResolverImpl
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor

@EnableWebSecurity
class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService

    @Autowired
    private DaoAuthenticationProvider authenticationProvider

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
                .access("hasRole('ADM')")
                .and()
                .authorizeRequests()
                .antMatchers("/enter")
                .access("hasRole('USER') or hasRole('ADM')")
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/enter")
                .usernameParameter("ssoId")
                .passwordParameter("password")
                .and()
                .rememberMe()
                .rememberMeParameter("remember-me")
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
