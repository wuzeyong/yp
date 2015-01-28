/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * nihongye   2013-11-29   comment
 * nihongye  2013-11-29  Created
 */
package com.wzy.design.web.support;

import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

/**
 * @author wuzeyong
 *
 */
public abstract class AbstractPatternFilter implements Filter{

    private static final String INCLUDE_URI_PATTERN_NAME = "includeURIPattern";
    private String includeURLPattern = "";

    /**
     * 
     */
    public AbstractPatternFilter() {
        super();
    }

    /**
     * @param httpServletRequest
     * @return
     */
    protected boolean isHandle(HttpServletRequest httpServletRequest) {
        String path = httpServletRequest.getRequestURI();
        if(!"/".equals(httpServletRequest.getContextPath())){
            //去除contextPath
            path = path.replace(httpServletRequest.getContextPath(), "");
        }
        return Pattern.matches(includeURLPattern, path);
    }

    /**
     * @see Filter#init(FilterConfig)
     */
    public void init(FilterConfig config) throws ServletException {
        includeURLPattern = config.getInitParameter(INCLUDE_URI_PATTERN_NAME);
    
    }

}
