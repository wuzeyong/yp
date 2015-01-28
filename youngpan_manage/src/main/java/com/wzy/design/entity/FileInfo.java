package com.wzy.design.entity;


import com.wzy.design.base.AbstractEntity;
import com.wzy.design.base.FileType;

public class FileInfo extends AbstractEntity {
	
	private static final long serialVersionUID = 1L;
	/**
	 * 文件名
	 */
	private String fileName;
	/**
	 * 文件在服务器的路径
	 */
	private String pathInside;
	
	/**
	 *文件的总大小
	 */
	private Long fileSize;
	/**
	 * 文件类型
	 */
	private FileType fileType;
	
	private String contentType;
	
	/**
	 * 文件的拥有者
	 */
	private String  userName;
	
	/**
	 * 是否原始文件
	 */
	private boolean origin;
	
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getPathInside() {
		return pathInside;
	}
	public void setPathInside(String pathInside) {
		this.pathInside = pathInside;
	}
	public Long getFileSize() {
		return fileSize;
	}
	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}
	public FileType getFileType() {
		return fileType;
	}
	public String getFileTypeLabel(){
		return fileType.getType();
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public void setFileType(FileType fileType) {
		this.fileType = fileType;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public boolean isOrigin() {
		return origin;
	}
	public void setOrigin(boolean origin) {
		this.origin = origin;
	}
}
