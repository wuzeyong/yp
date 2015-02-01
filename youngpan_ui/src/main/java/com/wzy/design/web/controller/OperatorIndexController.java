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
    public ModelAndView index(Integer id) {
    	//Long count = fileInfoService.queryByUserName(getCurrentUserName());
    	String url = INDEX;
    	if(id != null){
    		List<FileInfo> descendants = fileInfoService.queryDescendantByAncestor(id);
    		url = descendants.size() > 0 ?INDEX:UPLOAD; 
    	}
    	OperatorModelAndView omv = new OperatorModelAndView(url);
    	if(id != null){
    		FileInfo current = fileInfoService.get(id);
    		omv.addObject("current", current);
    		List<FileInfo> ancestors = fileInfoService.queryAncestorByDescendant(id);
    		omv.addObject("ancestors", ancestors);
    	}
    	omv.addObject("isPage", true);
        return omv;
    }
    
    @ResponseBody
    @RequestMapping("list.do")
    public JQGridPage<?> list(Integer id,int page, int rows) {
        rows = rows <= 0 ? DEFAULT_PAGE_SIZE : rows;
        if(id == null){
        	Page<FileInfo> pager = fileInfoService.query(getCurrentUserName(), (page - 1) * rows, rows);
        	return JQGridPage.create(pager);
        }
        Page<FileInfo> pager = fileInfoService.query(id, (page - 1) * rows, rows);
    	return JQGridPage.create(pager);
    }

}
