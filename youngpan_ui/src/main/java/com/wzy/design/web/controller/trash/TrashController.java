package com.wzy.design.web.controller.trash;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.wzy.design.entity.FileInfo;
import com.wzy.design.entity.User;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.service.UserService;
import com.wzy.design.support.Page;
import com.wzy.design.web.controller.BaseController;
import com.wzy.design.web.support.JQGridPage;
import com.wzy.design.web.view.OperatorModelAndView;

@Controller
@Scope("prototype")
@RequestMapping("/operator/trash")
public class TrashController extends BaseController {
	
	private static final String JSP_PRIX = "operator/trash/";

    private static final String INDEX = JSP_PRIX + "index";
    
    private static final String NO_TRASH = JSP_PRIX+ "notrash";
    
    @Autowired
    private FileInfoService fileInfoService;
    
    @Autowired
    private UserService userService;

	@RequestMapping("index.do")
	public ModelAndView index(Integer id){
		//Long pictureNum = fileInfoService.queryAllTrash(getCurrentUserName());
    	//OperatorModelAndView omv = new OperatorModelAndView(pictureNum > 0 ?INDEX:NO_TRASH);
    	String url = INDEX;
    	if(id == null){
    		Long trashNum = fileInfoService.queryAllTrash(getCurrentUserName());
    		url = trashNum > 0 ?INDEX:NO_TRASH; 
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
        Page<FileInfo> pager = null;
        if(id == null){
        	pager= fileInfoService.queryTrash(getCurrentUserName(), (page - 1) * rows, rows);
        }else{
        	pager = fileInfoService.queryTrash(id,getCurrentUserName(),(page - 1) * rows, rows);
        }
        
    	return JQGridPage.create(pager);
    }
	
	@RequestMapping("undo.do")
	public String undo(Integer id){
		fileInfoService.undo(id);
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("removeForever.do")
	public  String removeForever(Integer id,HttpServletRequest request){
		FileInfo fileRemoved = fileInfoService.removeForever(id,getCurrentUser());
		User user = userService.get(getCurrentUser().getId());
		bindUserToSession(request, user);
		return SUCCESS_VIEW;
	}
}
