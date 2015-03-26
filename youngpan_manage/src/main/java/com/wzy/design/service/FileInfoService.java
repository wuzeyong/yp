package com.wzy.design.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.wzy.design.domain.TreeNode;
import com.wzy.design.entity.FileInfo;
import com.wzy.design.entity.User;
import com.wzy.design.support.Cache;
import com.wzy.design.support.Page;

public interface FileInfoService {

	public Page<FileInfo> query(String userName,int start,int limit);

	public FileInfo get(int id);

	public void updateFileName(int id, String fileName);

	public List<FileInfo> remove(int[] ids);

	public Long queryByUserName(String currentUserName);

	public void upload(MultipartFile file, Integer id, User user);


	public Page<FileInfo> query(Integer id, int start, int limit);

	public List<FileInfo> queryAncestorByDescendant(Integer id);

	public List<FileInfo> queryDescendantsByAncestor(Integer id);

	public void createDir(Integer id, String fileName, String lastModify,String userName);

	public Long queryAllPictures(String userName);

	public Long queryAllMusic(String userName);

	public Long queryAllVideo(String userName);

	public Long queryAllDocument(String userName);

	public Long queryAllOther(String userName);
	
	public Long queryAllTrash(String currentUserName);
	
	public Page<FileInfo> queryFileByContentType(String userName,List<String> contentType,
			int start, int limit);

	public Page<FileInfo> queryOtherByContentType(String userName,int start, int limit);

	public Page<FileInfo> queryTrash(String currentUserName, int start, int limit);

	public Page<FileInfo> queryTrash(Integer id, String currentUserName, int start,int limit);

	public FileInfo removeForever(Integer id,User user);

	public void undo(Integer id);

	public List<TreeNode> getNodes(String userName,Integer id);

}
