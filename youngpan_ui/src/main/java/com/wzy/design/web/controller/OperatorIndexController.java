/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * caihuiji   2013-6-27   comment
 * caihuiji  2013-6-27  Created
 */
package com.wzy.design.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.wzy.design.entity.FileInfo;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.support.Page;
import com.wzy.design.web.support.JQGridPage;
import com.wzy.design.web.view.OperatorModelAndView;

/**
 * 操作员首页
 * 
 * @author nihy
 * 
 */
@Controller
@Scope("prototype")
@RequestMapping("/operator/")
public class OperatorIndexController extends BaseController{

    private static final String JSP_PRIX = "operator/";

    private static final String INDEX = JSP_PRIX + "index";
    
    private static final String UPLOAD = JSP_PRIX+ "upload";
    
    @Autowired
    private FileInfoService fileInfoService;
    
    @RequestMapping("index.do")
    public ModelAndView index() {
    	Long count = fileInfoService.queryByUserName(getCurrentUserName());
    	OperatorModelAndView omv = new OperatorModelAndView(count > 0 ? INDEX : UPLOAD);
        return omv;
    }
    
    @ResponseBody
    @RequestMapping("list.do")
    public JQGridPage<?> list(int page, int rows) {
        rows = rows <= 0 ? DEFAULT_PAGE_SIZE : rows;
        Page<FileInfo> pager = fileInfoService.query(getCurrentUserName(), (page - 1) * rows, rows);
        return JQGridPage.create(pager);
    }

}
