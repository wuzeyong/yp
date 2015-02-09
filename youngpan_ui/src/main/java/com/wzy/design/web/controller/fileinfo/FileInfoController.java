package com.wzy.design.web.controller.fileinfo;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.wzy.design.entity.FileInfo;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.support.YPManageException;
import com.wzy.design.web.controller.BaseController;
import com.wzy.design.web.support.WebConstants;

@Controller
@Scope("prototype")
@RequestMapping("/operator/fileinfo/")
public class FileInfoController extends BaseController {
	
	private static final String JSP_PRIX = "operator/";
    
    private static final String UPLOAD_VIEW = JSP_PRIX + "upload";
    
	@Autowired
	private FileInfoService fileInfoService;
	

	@RequestMapping("uploadView.do")
    public ModelAndView createResetPasswordView() {
        ModelAndView mv = new ModelAndView(UPLOAD_VIEW);
        mv.addObject("isPage", false);
        return mv;
    }
	
	@RequestMapping("updateFileName.do")
	public String update(int id ,String fileName){
		fileInfoService.updateFileName(id,fileName);
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("remove.do")
	public String remove(int[] ids){
		fileInfoService.remove(ids);
		return SUCCESS_VIEW;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("upload.do")
	public String upload(MultipartFile file, HttpServletRequest request){
		HashMap<String, FileInfo> filesInSession = (HashMap<String, FileInfo>) getObjectFromSession(WebConstants.SESSION_FILES);
		if(filesInSession == null){
			filesInSession= new HashMap<String,FileInfo>();
		}
		FileInfo fileInfo = new FileInfo();
		fileInfo.setFileName(file.getName());
		fileInfo.setFileSize(file.getSize());
		fileInfo.setUserName(getCurrentUserName());
		fileInfo.setContentType(file.getContentType());
		filesInSession.put(fileInfo.getFileName(), fileInfo);
		bindAttributeToSession(request, WebConstants.SESSION_FILES, filesInSession);
		return SUCCESS_VIEW;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("cancel.do")
	public String cancel(String fileName,HttpServletRequest request){
		HashMap<String, FileInfo> filesInSession = (HashMap<String, FileInfo>) getObjectFromSession(WebConstants.SESSION_FILES);
		if(filesInSession != null){
			filesInSession.remove(fileName);
			bindAttributeToSession(request, WebConstants.SESSION_FILES, filesInSession);
		}
		return SUCCESS_VIEW;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("cancelAll.do")
	public String cancelAll(HttpServletRequest request){
		HashMap<String, FileInfo> filesInSession = (HashMap<String, FileInfo>) getObjectFromSession(WebConstants.SESSION_FILES);
		if(filesInSession == null){
			throw new YPManageException(YPManageException.NO_FILES,"没有文件可取消！");
		}
		unbindAttributeToSession(request, WebConstants.SESSION_FILES);
		return SUCCESS_VIEW;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("uploadAll.do")
	public String uploadAll(HttpServletRequest request){
		HashMap<String, FileInfo> filesInSession = (HashMap<String, FileInfo>) getObjectFromSession(WebConstants.SESSION_FILES);
		if(filesInSession == null){
			throw new YPManageException(YPManageException.NO_FILES,"没有文件可传！");
		}
		fileInfoService.uploadAll(filesInSession);
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("createDirectory.do")
	public String creatDirectory(Integer id,String fileName,String lastModify){
		fileInfoService.createDir(id,fileName,lastModify,getCurrentUserName());
		return SUCCESS_VIEW;
	}
	
}
