package com.wzy.design.entity;


import java.util.Date;

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
	 * 文件的标准类型
	 */
	private String contentType;
	
	/**
	 * 文件的拥有者
	 */
	private String  userName;
	
	/**
	 * 是否原始文件
	 */
	private boolean origin = false;
	
	/**
	 * 是否目录
	 */
	private boolean directory;
	
	/**
	 * 是否为垃圾
	 */
	private boolean trash;
	
	/**
	 * 标志为垃圾的时间
	 */
	private Date trashTime;
	
	/**
	 * 是否为第一个垃圾
	 */
	private boolean topTrash;
	
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
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
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
	public boolean isDirectory() {
		return directory;
	}
	public void setDirectory(boolean directory) {
		this.directory = directory;
	}
	public boolean isTrash() {
		return trash;
	}
	public void setTrash(boolean trash) {
		this.trash = trash;
	}
	public Date getTrashTime() {
		return trashTime;
	}
	public void setTrashTime(Date trashTime) {
		this.trashTime = trashTime;
	}
	public boolean isTopTrash() {
		return topTrash;
	}
	public void setTopTrash(boolean topTrash) {
		this.topTrash = topTrash;
	}
	
}
