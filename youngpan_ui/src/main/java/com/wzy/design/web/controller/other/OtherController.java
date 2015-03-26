package com.wzy.design.web.controller.other;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.wzy.design.entity.FileInfo;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.support.Page;
import com.wzy.design.web.controller.BaseController;
import com.wzy.design.web.support.JQGridPage;
import com.wzy.design.web.view.OperatorModelAndView;

@Controller
@Scope("prototype")
@RequestMapping("/operator/other")
public class OtherController extends BaseController {
	
	private static final String JSP_PRIX = "operator/other/";

    private static final String INDEX = JSP_PRIX + "index";
    
    private static final String UPLOAD = JSP_PRIX+ "upload";
    
    @Autowired
    private FileInfoService fileInfoService;

	@RequestMapping("index.do")
	public ModelAndView index(){
		Long pictures = fileInfoService.queryAllOther(getCurrentUserName());
    	OperatorModelAndView omv = new OperatorModelAndView(pictures > 0 ?INDEX:UPLOAD );
    	omv.addObject("isPage", true);
        return omv;
	}
	
	@ResponseBody
    @RequestMapping("list.do")
    public JQGridPage<?> list(int page, int rows) {
        rows = rows <= 0 ? DEFAULT_PAGE_SIZE : rows;
        Page<FileInfo> pager = fileInfoService.queryOtherByContentType(getCurrentUserName(), (page - 1) * rows, rows);
    	return JQGridPage.create(pager);
    }
}
