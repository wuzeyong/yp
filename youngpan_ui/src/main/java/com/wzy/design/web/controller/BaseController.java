package com.wzy.design.web.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import com.wzy.design.entity.User;
import com.wzy.design.web.support.ControllerContext;
import com.wzy.design.web.support.DatePropertyEditor;
import com.wzy.design.web.support.WebConstants;

public class BaseController {
    public static String SUCCESS_VIEW = "success";
    public static String FAIL_VIEW = "fail";
    public static String ACCESS_DENIED_VIEW = "403";
    public static final int DEFAULT_PAGE_SIZE = 10;
      
    
    /**
     * 用于解决request请求参数中String与data数据类型的转换
     * 
     * @param binder
     */
    @InitBinder
    public void initDataBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new DatePropertyEditor());
    }
    
    protected String getCurrentUserName(){
        User user = (User) ControllerContext.getSession().getAttribute(WebConstants.SESSION_WANGPAN_USER);
        return user.getName();
    }
    
    protected User getCurrentUser(){
        User user = (User) ControllerContext.getSession().getAttribute(WebConstants.SESSION_WANGPAN_USER);
        return user;
    }

    protected void bindUserToSession(HttpServletRequest httpServletRequest, User user) {
        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute(WebConstants.SESSION_WANGPAN_USER, user);
    }

    protected void unbindUserToSession(HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        if(session != null){
            session.invalidate();
        }
    }
    
}
