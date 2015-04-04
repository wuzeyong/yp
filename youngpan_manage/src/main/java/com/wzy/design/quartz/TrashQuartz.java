package com.wzy.design.quartz;

import org.springframework.beans.factory.annotation.Autowired;

import com.wzy.design.service.FileInfoService;

public class TrashQuartz {
	
	@Autowired
	private FileInfoService fileInfoService;
	
	public void cleanTrash(){
		fileInfoService.cleanTrash();
	}
}
