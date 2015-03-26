package com.wzy.design.util;

import org.junit.runner.RunWith;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 测试超类
 * 
 * @author wuzeyong
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:/META-INF/*-component*.xml"})
@ActiveProfiles("test")
public abstract class AbstractTransactionalTest extends AbstractTransactionalJUnit4SpringContextTests {

}
