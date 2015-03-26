package com.wzy.design.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.wzy.design.base.Role;
import com.wzy.design.domain.UserInfo;
import com.wzy.design.entity.User;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.service.UserService;
import com.wzy.design.support.YPManageException;

/**
 * 登录，只支持成功后，跳到某个页面，暂不支持跳转到登录前所访问的资源
 * <li>功能简述:
 * <li>详细描述:
 * @author  wzy
 * @version  [1.0 Dec 22, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
@Controller
@Scope("prototype")
@RequestMapping("/login/")
public class LoginController extends BaseController{
    
    private static final String ADMIN_INDEX = "/admin/index.do";

    private static final String OPERATOR_INDEX = "/operator/index.do";

    private static final String JSP_PRIX = "/common/";

    private static final String INDEX = JSP_PRIX + "login";
    
    private static final String REGIST = JSP_PRIX + "regist";

    @Autowired
    private UserService userService;
    
    @Autowired
    private FileInfoService fileInfoService;
    
    @RequestMapping("index.do")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView(INDEX);
        return mv;
    }
    
    @RequestMapping("login.do")
    public ModelAndView login(String username,String password,HttpServletRequest httpServletRequest){
        try{
            User user = userService.auth(username, password);
            bindUserToSession(httpServletRequest, user);
            String targetPage = Role.OPERATOR.equals(user.getRole()) ? OPERATOR_INDEX : ADMIN_INDEX;
            ModelAndView mv = new ModelAndView("redirect:"+targetPage);
            return mv;
        }catch(YPManageException e){
            ModelAndView mv = new ModelAndView(INDEX);
            mv.addObject("username", username);
            mv.addObject("message", e.getMessage());
            return mv;
        }
    }
    
    @RequestMapping("registView.do")
    public ModelAndView registView(){
    	ModelAndView mv = new ModelAndView(REGIST);
    	return mv;
    }
    
    @RequestMapping("regist.do")
    public ModelAndView regist(UserInfo userInfo){
    	try {
    		userService.regist(userInfo);
    		ModelAndView mv = new ModelAndView(INDEX);
            mv.addObject("username", userInfo.getName());
            return mv;
		} catch (YPManageException e) {
			ModelAndView mv = new ModelAndView(INDEX);
            mv.addObject("message", e.getMessage());
            mv.addObject("regist", true);
            return mv;
		}
    }
}
