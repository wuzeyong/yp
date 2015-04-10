package com.wzy.design.service;

import java.io.File;
import java.io.InputStream;

import org.apache.hadoop.fs.FileStatus;

public interface HdfsService {
	public void mkdirs(String folder);
	
	public FileStatus[] ls(String folder);
	
	public void upload(InputStream in, String path);
	
	public void rmr(String folder);
	
	public byte[] download(String path);

	public void rename(String fileName, String newPath,String oldPath);

	public void move(String srcPath, String desPath);
	
	public String downloadDir(String srcPath,String userName);
}
