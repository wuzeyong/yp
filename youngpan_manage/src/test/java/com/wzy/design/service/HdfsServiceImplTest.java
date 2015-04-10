package com.wzy.design.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.wzy.design.util.AbstractTransactionalTest;

public class HdfsServiceImplTest extends AbstractTransactionalTest{
	
	@Autowired
	private HdfsService hdfsService;
	
	@Test
	public void testLs(){
		hdfsService.ls("/admin/aa/ddd");
		//hdfsService.rmr("/admin/aa/dd/nnn");
	}
	
	@Test
	public void testRmr(){
		//hdfsService.rmr("/admin/aa/ddd/nnn");
	}
}
