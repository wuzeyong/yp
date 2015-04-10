package com.wzy.design.service;

public class Test {
	public static void main(String[] args) {
		String sys = System.getProperties().getProperty("os.name") ;
		System.out.println("Linux".equals(sys));
	}
}
