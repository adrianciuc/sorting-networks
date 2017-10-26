package com.fii.sorting.networks

import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver

import javax.servlet.http.HttpServletRequest


class EnhancedMappingExceptionResolver extends SimpleMappingExceptionResolver {

    protected final Log logger = LogFactory.getLog(getClass());

    protected void logException(Exception ex, HttpServletRequest request) {
        if (this.logger.isErrorEnabled()) {
            this.logger.error('Exception cached', ex)
        }
    }
}
