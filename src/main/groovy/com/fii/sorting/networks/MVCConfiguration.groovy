package com.fii.sorting.networks

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.View
import org.springframework.web.servlet.ViewResolver
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver
import org.springframework.web.servlet.view.JstlView
import org.springframework.web.servlet.view.UrlBasedViewResolver

@Configuration
@EnableWebMvc
class MVCConfiguration extends WebMvcConfigurerAdapter{
    @Bean
    ViewResolver getViewResolver() {
        UrlBasedViewResolver resolver = new UrlBasedViewResolver();
        resolver.setPrefix("/WEB-INF/jsp/")
        resolver.setSuffix(".jsp")
        resolver.setViewClass(JstlView.class)
        return resolver;
    }

    @Override
    void configureDefaultServletHandling(
            DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Bean(name="simpleMappingExceptionResolver")
    SimpleMappingExceptionResolver createSimpleMappingExceptionResolver() {
        SimpleMappingExceptionResolver resolver = new EnhancedMappingExceptionResolver();
        resolver.setDefaultErrorView('defaultErrorPage')
        resolver.setWarnLogCategory('com.fii.sorting.ApplicationLogger')
        return resolver
    }

    @Bean(name = "error")
    View defaultErrorView() {
        return new JstlView('/WEB-INF/jsp/defaultErrorPage.jsp')
    }
}
