package com.wzy.design.service;

import com.wzy.design.base.Role;
import com.wzy.design.domain.UserInfo;
import com.wzy.design.entity.User;
import com.wzy.design.support.Page;

public interface UserService {

	 public Integer create(User user);
	    
	    public void remove(int[] id);

	    //public void update(UserUpdateInfo updateInfo);

	    public void disable(Integer id);

	    public void lock(Integer id);

	    public void unLock(Integer id);

	    public void changePassword(String username, String oldPassword, String newPassword);

	    public User auth(String username, String password);
	    
	    public User get(Integer id);
	    
	    public Page<User> query(String username,String realName, Role role, int start,int limit);

	    public User findByName(String name);

		public void regist(UserInfo userInfo);

		User update(UserInfo userInfo);

}
