/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * caihuiji   2013-6-26   comment
 * caihuiji  2013-6-26  Created
 */
package com.wzy.design.web.support;

import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

/**
 * spring exception resolver <br/>
 * 
 * if throw exception before spring mvc , should case by tomcat of exceptionHandler
 * @author wzy
 * 
 */
public class SipMappingExceptionResolver extends SimpleMappingExceptionResolver {

    public static final String MESSAGE_KEY = "message";
    private static final String DELETE = "DELETE";
    private static final String REFERENCE = "REFERNCE";
    private static final String VIOLATION = "Violation";

    /**
     * 
     */
    public SipMappingExceptionResolver() {
    }

    @Override
    protected ModelAndView getModelAndView(String viewName, Exception ex) {
        ModelAndView mv = new ModelAndView(viewName);
        String message = resolveMessage(ex);
        logger.error("Exposing Exception as model attribute '" + MESSAGE_KEY, ex);
        mv.addObject(MESSAGE_KEY, message);
        return mv;
    }

    /**
     * @param ex
     * @return
     */
    public static String resolveMessage(Exception ex) {
        String message = ex.getMessage();
        if(StringUtils.isEmpty(message)){
            message = "系统发生异常，请联系管理员";
        }
        if(ex instanceof org.hibernate.exception.ConstraintViolationException){
            message = "数据被引用,不能删除！";
        }else if(message.indexOf(DELETE) >= 0 && message.indexOf(REFERENCE) >= 0){
            message = "数据被引用,不能删除！"; 
        }else if(message.indexOf(VIOLATION) >= 0){
            message = "数据被引用或数据不存在！"; 
        }else if (ex instanceof MaxUploadSizeExceededException) {
            message = "上传文件不能超过" + ((MaxUploadSizeExceededException) ex).getMaxUploadSize() / 1024000 + "M";
        }else if(!(ex instanceof FTManageException || ex instanceof IllegalArgumentException)){
            if(ex.getMessage() != null && hasChinese(ex.getMessage())){
                message = ex.getMessage();
            }else{
                message = "发生未知的内部错误！";
            }
        }
        return message;
    }

    /**
     * @param message
     * @return
     */
    protected static boolean hasChinese(String message) {
        return Pattern.compile("[\u4E00-\u9FA5]+").matcher(message).find();
    }
}
