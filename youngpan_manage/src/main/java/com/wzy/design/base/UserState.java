package com.wzy.design.base;

/**
 * 用户状态
 * <li>功能简述:
 * <li>详细描述:
 * @author  wzy
 * @version  [1.0 Dec 15, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
public enum UserState {
    LOCK("锁定"), NORMAL("正常"), DISABLED("停用");
    private String label;

    UserState() {
    }

    UserState(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

}
