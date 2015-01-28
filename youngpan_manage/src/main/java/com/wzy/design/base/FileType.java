package com.wzy.design.base;

public enum FileType {
	
	PDF("pdf"),DOC("doc");
	private String type;
	
	 FileType(){}
	
	FileType(String type){
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public String getFileType(){
		return this.type;
	}
	
}
