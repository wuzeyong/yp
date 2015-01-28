package com.wzy.design.entity;

import java.util.Date;

import com.wzy.design.base.AbstractEntity;
import com.wzy.design.base.Role;
import com.wzy.design.base.UserState;

/**
 * 用户
 * <li>功能简述:
 * <li>详细描述:
 * @author  wzy
 * @version  [1.0 Dec 29, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
public class User extends AbstractEntity {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    /**
     * 用户名
     */
    private String name;
    /**
     * 用户中文名
     */
    private String realName;
    
    /**
     * 电子邮箱
     */
    private String email;
    
    /**
     * 手机
     */
    private String mobile;
    
    /**
     * 密码
     */
    private String password;
    /**
     * 用户状态
     */
    private UserState state;
    
    /**
     * 角色
     */
    private Role role;
    
    /**
     * 状态说明,如密码到期、重试超过一定次数被锁定
     */
    private String stateDesc;
    
    /**
     * 密码生效时间
     */
    private Date passwordValidDate;
    
    /**
     * 密码重试次数
     */
    private int passwordRetries;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserState getState() {
        return state;
    }

    public void setState(UserState state) {
        this.state = state;
    }

    public String getStateDesc() {
        return stateDesc;
    }

    public void setStateDesc(String stateDesc) {
        this.stateDesc = stateDesc;
    }

    public Date getPasswordValidDate() {
        return passwordValidDate;
    }

    public void setPasswordValidDate(Date passwordValidDate) {
        this.passwordValidDate = passwordValidDate;
    }

    public int getPasswordRetries() {
        return passwordRetries;
    }

    public void setPasswordRetries(int passwordRetries) {
        this.passwordRetries = passwordRetries;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    
    public String getRoleLabel(){
        return this.role.getLabel();
    }
    
    public String getStateLabel(){
        return this.state.getLabel();
    }
    
    
}
