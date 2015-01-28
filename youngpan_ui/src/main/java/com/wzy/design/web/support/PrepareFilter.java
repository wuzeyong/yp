/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * caihuiji   2013-11-13   comment
 * caihuiji  2013-11-13  Created
 */
package com.wzy.design.web.support; 

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 准备 filter ，注入 当前线程可用的东西，例如 request 和 response 
 * @author wzy
 *
 */
public class PrepareFilter implements Filter {

    private long startUpTimeStamp;

    /* (non-Javadoc)
     * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
     */
    public void init(FilterConfig filterConfig) throws ServletException {
        startUpTimeStamp = System.currentTimeMillis();
    }

    /* (non-Javadoc)
     * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
     */
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        new ControllerContext((HttpServletRequest)request, (HttpServletResponse)response);
        request.setAttribute("v", startUpTimeStamp);
        request.setAttribute("timestamp", System.currentTimeMillis());
        String contextPath = ((HttpServletRequest)request).getContextPath();
        if(!contextPath.endsWith("/")){
            contextPath += "/";
        }
        request.setAttribute("contextPath", contextPath);
        try{
            chain.doFilter(request, response);
        }finally{
            ControllerContext.desctoryContext();
        }
        
    }

    /* (non-Javadoc)
     * @see javax.servlet.Filter#destroy()
     */
    public void destroy() {

    }

}
 
