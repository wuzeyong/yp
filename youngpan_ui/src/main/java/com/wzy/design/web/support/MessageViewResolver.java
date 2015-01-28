package com.wzy.design.web.support;

import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

/**
 * message 页面解析器
 * 
 * @author wzy
 * 
 */
public class MessageViewResolver extends UrlBasedViewResolver {

    private static final Logger log = LoggerFactory.getLogger(MessageViewResolver.class);

    // XXX jquery ajax 请求时候，带的参数
    private static final String XHR_OBJECT_NAME = "XMLHttpRequest";
    private static final String HEADER_REQUEST_WITH = "x-requested-with";

    public static final String SUCCESS = "success";
    public static final String FAIL = "fail";
    private static final String _403 = "403";

    private Set<String> messageViewNames = new HashSet<String>();

    private String context = "/";

    private String type = "html/";
    

    /* (non-Javadoc)
     * @see org.springframework.web.servlet.view.UrlBasedViewResolver#createView(java.lang.String, java.util.Locale)
     */
    @Override
    protected View createView(String viewName, Locale locale) throws Exception {
        if (!messageViewNames.contains(viewName)) {
            return null;
        }

        HttpServletResponse response = ControllerContext.getResponse();
        HttpServletRequest request = ControllerContext.getRequest();
        // 错误，响应给前端 400
        if (viewName.equals(FAIL)) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
        } else if (viewName.equals(_403)) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }

        if (isAjax(request)) {
            if (log.isDebugEnabled()) {
                log.debug("ajax request.");
            }
            
            JsonView jsonview = new JsonView();
            jsonview.setStatus(viewName);
            return jsonview;
        }

        if (log.isDebugEnabled()) {
            log.debug("normal request.");
        }
        
        View view = buildView(viewName);
        return view;

    }

    /**
     * 是否是ajax 请求<br/>
     * 注意：只适用于 框架性的 ajax 请求。 原生态ajax 请增加 x-requested-with = XMLHttpRequest
     * 
     * @param request
     * @return
     */
    public boolean isAjax(HttpServletRequest request) {
        if (XHR_OBJECT_NAME.equals(request.getHeader(HEADER_REQUEST_WITH))) {
            return true;
        }
        return false;
    }

    /**
     * @return the messageViewNames
     */
    public Set<String> getMessageViewNames() {
        return this.messageViewNames;
    }

    /**
     * @param messageViewNames the messageViewNames to set
     */
    public void setMessageViewNames(Set<String> messageViewNames) {
        this.messageViewNames = messageViewNames;
    }


}
