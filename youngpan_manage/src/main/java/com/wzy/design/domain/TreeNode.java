package com.wzy.design.domain;

import java.util.ArrayList;
import java.util.List;

public class TreeNode {
	private Integer id;// 节点编号
	private String text;// 节点文本
	private String state = "closed";// 节点状态
	private String iconCls="tree-file";
	private List<TreeNode> children = new ArrayList<TreeNode>();// 子节点集合

	public TreeNode() {
	}

	public TreeNode(Integer id, String text) {
		this.id = id;
		this.text = text;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public List<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNode> children) {
		this.children = children;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	
}