package com.wzy.design.domain;

public enum Music {
	
	MP3("audio/mp3"),WAV("audio/wav"),WMA("audio/x-ms-wma"),AIF("audio/aiff"),
	AU("audio/basic"),RAM("audio/x-pn-realaudio");
	private String label;
	
	Music(){}
	
	Music(String label){
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
	
	
}
