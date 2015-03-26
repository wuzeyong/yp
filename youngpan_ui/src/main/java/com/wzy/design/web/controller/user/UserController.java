package com.wzy.design.web.controller.user;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.wzy.design.domain.UserInfo;
import com.wzy.design.entity.User;
import com.wzy.design.service.UserService;
import com.wzy.design.web.controller.BaseController;

@Controller
@Scope("prototype")
@RequestMapping("/operator/user/")
public class UserController extends BaseController{
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	private static final String JSP_PRIX = "common/";
	
	private static final String REST_PASSWORD_VIEW = JSP_PRIX + "passwordResetting";
	
	private static final String EDIT_PERSONINFO_VIEW = JSP_PRIX + "personInfoEdit";
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("resetPasswordView.do")
    public ModelAndView createResetPasswordView() {
        ModelAndView mv = new ModelAndView(REST_PASSWORD_VIEW);
        mv.addObject("user", getCurrentUser());
        return mv;
    }
    
    @RequestMapping("editPersonInfoView.do")
    public ModelAndView createEditPersonInfoView() {
        ModelAndView mv = new ModelAndView(EDIT_PERSONINFO_VIEW);
        mv.addObject("user", getCurrentUser());
        return mv;
    }
    
    @RequestMapping("resetPassword.do")
    public String resetPassword(String oldPassword,String passWord,HttpServletRequest request){
        String username = getCurrentUserName();
        userService.changePassword(username, oldPassword, passWord);
        User user = userService.findByName(username);
        bindUserToSession(request, user);
        return SUCCESS_VIEW;
    }

    @RequestMapping("editPersonInfo.do")
    public String editPersonInfo(UserInfo userInfo,HttpServletRequest request){
        if (log.isDebugEnabled()) {
            log.debug(userInfo.toString());
        }
        User user = userService.update(userInfo);
        bindUserToSession(request, user);
        return SUCCESS_VIEW;
    }
}
