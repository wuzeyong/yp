package com.wzy.design.web.controller.fileinfo;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.wzy.design.domain.TreeNode;
import com.wzy.design.entity.FileInfo;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.service.HdfsService;
import com.wzy.design.support.CacheManager;
import com.wzy.design.web.controller.BaseController;

@Controller
@Scope("prototype")
@RequestMapping("/operator/fileinfo/")
public class FileInfoController extends BaseController {
	
	private static final String JSP_PRIX = "operator/";
    
    private static final String UPLOAD_VIEW = JSP_PRIX + "batchUpload";
    
    private static final String CREATE_DIRECTORY_VIEW = JSP_PRIX + "createDir";
    
    private static final String DOCUMENT_TREE_VIEW = JSP_PRIX + "docTree";
    
    
    private static final int BUFFER_SIZE = 2048;
	@Autowired
	private FileInfoService fileInfoService;
	
	@Autowired
	private HdfsService hdfsService;
	

	@RequestMapping("uploadView.do")
    public ModelAndView uploadView(Integer id) {
        ModelAndView mv = new ModelAndView(UPLOAD_VIEW);
        mv.addObject("id", id);
        return mv;
    }
	
	@RequestMapping("moveView.do")
    public ModelAndView moveView() {
        ModelAndView mv = new ModelAndView(DOCUMENT_TREE_VIEW);
        return mv;
    }
	
	@RequestMapping("move.do")
    public String move(Integer id,Integer des) {
		fileInfoService.move(id,des,getCurrentUserName());
        return SUCCESS_VIEW;
    }
	
	
	@RequestMapping("createDirectoryFirstlyView.do")
    public ModelAndView createDirectoryFirstlyView() {
        ModelAndView mv = new ModelAndView(CREATE_DIRECTORY_VIEW);
        return mv;
    }

	
	@RequestMapping("updateFileName.do")
	public String update(int id ,String fileName){
		fileInfoService.updateFileName(id,fileName,getCurrentUser());
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("remove.do")
	public String remove(int[] ids){
		fileInfoService.remove(ids);
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("upload.do")
	public String  upload(MultipartFile file,Integer id, HttpServletRequest request){
		fileInfoService.upload(file,id,getCurrentUser());
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("cancel.do")
	public String cancel(String fileName,HttpServletRequest request){
		CacheManager.clearOnly(fileName);
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("cancelAll.do")
	public String cancelAll(HttpServletRequest request){
		CacheManager.clearAll();
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("createDirectory.do")
	public String creatDirectory(Integer id,String fileName,String lastModify){
		fileInfoService.createDir(id,fileName,lastModify,getCurrentUserName());
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("createDirectoryFirstly.do")
	public String createDirectoryFirstly(Integer id,String fileName,String lastModify){
		fileInfoService.createDir(id,fileName,lastModify,getCurrentUserName());
		return SUCCESS_VIEW;
	}
	
	@RequestMapping("download.do")
	public String download(Integer id,HttpServletRequest request,HttpServletResponse response){
		FileInfo file = fileInfoService.get(id);
		InputStream in = hdfsService.download(file.getPathInside());
		OutputStream os = null;
        try {
        	response.setCharacterEncoding("utf-8");
            response.setContentType(file.getContentType());
			//response.setHeader("Content-Disposition", "attachment;fileName="
			//        + new String(file.getFileName().getBytes("utf-8"), "ISO8859-1"));
            response.setHeader("Content-Disposition", "attachment;fileName="+file.getFileName());
			response.setHeader("Content-Length", String.valueOf(file.getFileSize()));  
			os = response.getOutputStream();
			IOUtils.copyBytes(in, os, file.getFileSize(), true);
			/*byte[] b = new byte[BUFFER_SIZE];
            int length =  in.read(b);
            while (length > 0) {
                os.write(b, 0, length);
                length =  in.read(b);
            }*/
			os.flush();
		} catch (UnsupportedEncodingException e) {
		} catch (IOException e) {
		}
		return null;
	}
	
	@RequestMapping("getNodes.do")
	@ResponseBody
	public String getNodes(Integer id){
		List<TreeNode> nodes = fileInfoService.getNodes(getCurrentUserName(),id);
		Gson gson = new Gson();
		String result = gson.toJson(nodes);
		return result;
	}
}
