package com.wzy.design.web.controller.fileinfo;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.wzy.design.entity.FileInfo;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.web.controller.BaseController;
import com.wzy.design.web.support.ControllerContext;
import com.wzy.design.web.support.WebConstants;

@Controller
@Scope("prototype")
@RequestMapping("/operator/fileinfo/")
public class FileInfoController extends BaseController {
	
	
	@Autowired
	private FileInfoService fileInfoService;
	
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
		HashMap<String, FileInfo> filesInSession = (HashMap<String, FileInfo>) ControllerContext.getSession().getAttribute(WebConstants.SESSION_FILES);
		if(filesInSession == null){
			filesInSession= new HashMap<String,FileInfo>();
		}
		FileInfo fileInfo = new FileInfo();
		fileInfo.setFileName(file.getName());
		fileInfo.setFileSize(file.getSize());
		fileInfo.setUserName(getCurrentUserName());
		fileInfo.setContentType(file.getContentType());
		filesInSession.put(fileInfo.getFileName(), fileInfo);
		request.getSession().setAttribute(WebConstants.SESSION_FILES, filesInSession);
		return SUCCESS_VIEW;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("cancel.do")
	public String cancel(String fileName,HttpServletRequest request){
		HashMap<String, FileInfo> filesInSession = (HashMap<String, FileInfo>) ControllerContext.getSession().getAttribute(WebConstants.SESSION_FILES);
		if(filesInSession != null){
			filesInSession.remove(fileName);
			request.getSession().setAttribute(WebConstants.SESSION_FILES, filesInSession);
		}
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("cancelAll.do")
	public String cancelAll(HttpServletRequest request){
		request.getSession().removeAttribute(WebConstants.SESSION_FILES);
		return SUCCESS_VIEW;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("uploadAll.do")
	public String uploadAll(HttpServletRequest request){
		HashMap<String, FileInfo> filesInSession = (HashMap<String, FileInfo>) ControllerContext.getSession().getAttribute(WebConstants.SESSION_FILES);
		if(filesInSession != null){
			fileInfoService.uploadAll(filesInSession);
		}
		return SUCCESS_VIEW;
	}
	
}
