package com.wzy.design.domain;

public enum Document {
	
	TXT("text/plain"),DOC("application/msword"),RFT("application/msword"),HTML("text/html"),
	PDF("application/pdf"),XML("text/xml"),XLS("application/x-xls"),PPT("application/vnd.ms-powerpoint");
	private String label;
	
	Document(){}
	
	Document(String label){
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
	
	
}
