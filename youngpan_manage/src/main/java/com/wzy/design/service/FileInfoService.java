package com.wzy.design.service;

import java.util.HashMap;
import java.util.List;

import com.wzy.design.base.Role;
import com.wzy.design.entity.FileInfo;
import com.wzy.design.support.Page;

public interface FileInfoService {

	public Page<FileInfo> query(String userName,int i,int rows);

	public FileInfo get(int id);

	public void updateFileName(int id, String fileName);

	public List<FileInfo> remove(int[] ids);

	public Long queryByUserName(String currentUserName);

	public void uploadAll(HashMap<String, FileInfo> filesInSession);
}
