package com.wzy.design.base;

/**
 * 角色
 * <li>功能简述:
 * <li>详细描述:
 * @author  wzy
 * @version  [1.0 Nov 26, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
public enum Role {
    ADMINER("管理员"), OPERATOR("操作员"), VISITOR("访客");
    private String label;

    Role() {
    }

    Role(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
    
    public String getName(){
        return this.name();
    }

}
