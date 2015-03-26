package com.wzy.design.domain;

public enum Picture {

	JPG("image/pjpeg"),GIF("image/gif"),BMP("image/bmp"),PNG("image/png");
	private String label;
	
	Picture(){}
	
	Picture(String label){
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

}
