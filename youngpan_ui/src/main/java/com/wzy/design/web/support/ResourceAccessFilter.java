package com.wzy.design.web.support;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;

import com.wzy.design.entity.User;


public class ResourceAccessFilter extends AbstractPatternFilter {
    private static String ALLOW_ACCESS_ROLES = "allowAccessRoles";
    private Set<String> allowAccessRoles;

	public void destroy() {
		// TODO Auto-generated method stub

	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        if(isHandle(httpServletRequest)){
            HttpSession session = httpServletRequest.getSession();
            if(session == null || session.getAttribute(WebConstants.SESSION_WANGPAN_USER) == null){
                String contextPath = httpServletRequest.getContextPath();
                String path = contextPath.equals("/") ? "/login/index.do" : contextPath + "/login/index.do"; 
                ((HttpServletResponse)response).sendRedirect(path);
                return;
            }
            User user = (User) session.getAttribute(WebConstants.SESSION_WANGPAN_USER);
            if(!allowAccessRoles.contains(user.getRole().name())){
                ((HttpServletResponse)response).setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
        }
        chain.doFilter(request,response);
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		super.init(config);
        String tmpAllowAccessRoles = config.getInitParameter(ALLOW_ACCESS_ROLES);
        if(StringUtils.isBlank(tmpAllowAccessRoles)){
            throw new IllegalArgumentException("请指定参数'" + ALLOW_ACCESS_ROLES + "'");
        }
        allowAccessRoles = new HashSet<String>(Arrays.asList(tmpAllowAccessRoles.split(",")));
	}

}
