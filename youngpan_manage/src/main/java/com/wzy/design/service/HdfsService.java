package com.wzy.design.service;

import java.io.InputStream;

import org.apache.hadoop.fs.FileStatus;

public interface HdfsService {
	public void mkdirs(String folder);
	
	public FileStatus[] ls(String folder);
	
	public void upload(InputStream in, String path);
	
	public void rmr(String folder);
	
	public InputStream download(String path);
}
