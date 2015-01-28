package com.wzy.design.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.wzy.design.service.UserService;


/**
 * 登出，登出后，跳转到登录页面
 * 
 * <li>功能简述: <li>详细描述:
 * 
 * @author wzy
 * @version [1.0 Dec 22, 2014]
 * @see [相关类/方法]
 * @since 1.0
 */
@Controller
@Scope("prototype")
@RequestMapping("/logout")
public class LogoutController extends BaseController {

    private static final String LOGIN_INDEX = "/login/index.do";

    @Autowired
    private UserService userService;

    @RequestMapping("logout.do")
    public ModelAndView logout(String username, String password, HttpServletRequest httpServletRequest) {
        unbindUserToSession(httpServletRequest);
        ModelAndView mv = new ModelAndView("redirect:" + LOGIN_INDEX);
        return mv;
    }

    

}
