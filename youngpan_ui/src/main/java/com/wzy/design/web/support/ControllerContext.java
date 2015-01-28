/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * caihuiji   2013-6-27   comment
 * caihuiji  2013-6-27  Created
 */
package com.wzy.design.web.support;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * spring mvc 上下文 环境
 * 
 * @author wzy
 * 
 */
public class ControllerContext {

	private static ThreadLocal<ControllerContext> contextHolder = new ThreadLocal<ControllerContext>();

	public static HttpServletRequest getRequest() {
		return contextHolder.get().request;
	}

	public static HttpServletResponse getResponse() {
		return contextHolder.get().response;
	}

	public static HttpSession getSession() {
		return contextHolder.get().request.getSession();
	}

	public static ServletContext getApplication() {
		return contextHolder.get().request.getSession(true).getServletContext();
	}

	protected HttpServletRequest request;

	protected HttpServletResponse response;

	/**
     * @param request
     * @param response
     */
    public ControllerContext(HttpServletRequest request, HttpServletResponse response) {
        super();
        this.request = request;
        this.response = response;
        contextHolder.set(this);
    }

	public static void desctoryContext() {
		contextHolder.set(null);
	}

}
