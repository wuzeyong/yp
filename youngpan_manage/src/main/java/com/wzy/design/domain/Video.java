package com.wzy.design.domain;

public enum Video {
	
	AVI("video/avi"),MPG("video/mpg"),MOV("video/x-sgi-movie"),MP4("video/mpeg4"),
	SWF("application/x-shockwave-flash");
	private String label;
	
	Video(){}
	
	Video(String label){
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
	
	
}
