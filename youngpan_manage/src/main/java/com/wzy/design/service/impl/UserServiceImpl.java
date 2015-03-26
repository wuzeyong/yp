package com.wzy.design.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.BeanUtils;
import org.springframework.transaction.annotation.Transactional;

import com.wzy.design.base.Role;
import com.wzy.design.base.UserState;
import com.wzy.design.domain.UserInfo;
import com.wzy.design.entity.User;
import com.wzy.design.service.UserService;
import com.wzy.design.support.YPManageException;
import com.wzy.design.support.Page;
import com.wzy.design.util.CodecUtil;

@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

	private static final Long MAX_CAPACITY = (long)4*1024*1024*1024;
	private static final int PASSWORD_RETRIES = 3;
	
	private String salt;
    private SessionFactory sessionFactory;
    
	@Override
    public Integer create(User user) {
        Session session = sessionFactory.getCurrentSession();
        User tmp = findByName(user.getName());
        if (tmp != null) {
            throw new YPManageException(YPManageException.USER_EXISTS,String.format("用户%s已存在!", user.getName()));
        }
        user.setPassword(encodePassword(user.getName(),user.getPassword()));
        user.setState(UserState.NORMAL);
        user.setPasswordRetries(0);
        user.setPasswordValidDate(null);
        user.setLastModify(new Date());
        session.save(user);
        return user.getId();
    }

    private String encodePassword(String username,String password) {
        return new String(CodecUtil.digestBySHA256AsHex((password + salt + username).getBytes()));
    }

    @Override
    @Transactional(readOnly=true)
    public User findByName(String name) {
        Session session = sessionFactory.getCurrentSession();
        return (User) session.createCriteria(User.class).add(Restrictions.eq("name", name)).uniqueResult();
    }

    @Override
    public User update(UserInfo userInfo) {
        Session session = sessionFactory.getCurrentSession();
        User tmp = (User) session.get(User.class, userInfo.getId());
        checkSate(tmp);
        tmp.setMobile(userInfo.getMobile());
        tmp.setRealName(userInfo.getRealName());
        tmp.setEmail(userInfo.getEmail());
        tmp.setLastModify(new Date());
        session.save(tmp);
        return tmp; 
    }

    private void checkSate(User tmp) {
        if(UserState.LOCK.equals(tmp.getState())){
            throw new YPManageException(YPManageException.USER_LOCK,"用户已被锁定!");
        }
        if(UserState.DISABLED.equals(tmp.getState())){
            throw new YPManageException(YPManageException.USER_DISABLED,"用户已被停用!");
        }
    }

    @Override
    public void disable(Integer id) {
        User user = get(id);
        user.setLastModify(new Date());
        user.setState(UserState.DISABLED);
        user.setStateDesc("用户被停用");
        sessionFactory.getCurrentSession().save(user);
    }
    
    @Override
    public void lock(Integer id) {
        User user = get(id);
        user.setLastModify(new Date());
        changeState(user,UserState.LOCK);
        user.setStateDesc("用户被锁定");
        sessionFactory.getCurrentSession().save(user);
    }

    private void changeState(User user, UserState state) {
        if(UserState.DISABLED.equals(user.getState())){
            throw new YPManageException(YPManageException.USER_DISABLED,"用户被禁用，其状态不能再被改变");
        }
        user.setState(state);
    }

    @Override
    public void unLock(Integer id) {
        User user = get(id);
        user.setLastModify(new Date());
        changeState(user, UserState.NORMAL);
        user.setStateDesc("");
        sessionFactory.getCurrentSession().save(user);
    }

    @Override
    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = findByName(username);
        if(user == null){
            throw new YPManageException(YPManageException.BAD_CREDENTIAL,"用户名或密码不正确!");
        }
        if(UserState.LOCK.equals(user.getState())){
            throw new YPManageException(YPManageException.USER_LOCK,"用户已被锁定，需解锁后方能修改密码!");
        }
        if(UserState.DISABLED.equals(user.getState())){
            throw new YPManageException(YPManageException.USER_DISABLED,"用户已被禁用!");
        }
        String encodePassword = encodePassword(username ,oldPassword);
        if(!user.getPassword().equals(encodePassword)){
            throw new YPManageException(YPManageException.BAD_CREDENTIAL,"用户名或密码不正确!");
        }
        user.setLastModify(new Date());
        user.setPassword(encodePassword(username ,newPassword));
        sessionFactory.getCurrentSession().save(user);
    }

    @Override
    public User auth(String username, String password) {
        User user = findByName(username);
       
        if(user == null){
            throw new YPManageException(YPManageException.BAD_CREDENTIAL,"用户名或密码不正确!");
        }
        if(UserState.LOCK.equals(user.getState())){
            throw new YPManageException(YPManageException.USER_LOCK,"用户已被锁定，需解锁后方能登录!");
        }
        if(UserState.DISABLED.equals(user.getState())){
            throw new YPManageException(YPManageException.USER_DISABLED,"用户已被禁用!");
        }
        String encodePassword = encodePassword(username,password);
        if(!user.getPassword().equals(encodePassword)){
            throw new YPManageException(YPManageException.BAD_CREDENTIAL,"用户名或密码不正确!");
        }
        return user;
    }
    
    private void remove(int id) {
        User user = get(id);
        if(user == null){
            return;
        }
        sessionFactory.getCurrentSession().delete(user);
    }
    
    @Override
    public void remove(int[] ids) {
        if(ids == null){
            return;
        }
        for(int i = 0;i < ids.length;i++){
            remove(ids[i]);
        }
    }

    @Override
    @Transactional(readOnly=true)
    public User get(Integer id) {
        return (User) sessionFactory.getCurrentSession().get(User.class, id);
    }

    @SuppressWarnings("unchecked")
    @Override
    @Transactional(readOnly=true)
    public Page<User> query(String username,String realName,Role role,int start, int limit) {
        Session session = sessionFactory.getCurrentSession();
        List<User> list = createQuery(username,realName, role,session)
                .addOrder(Order.desc("id"))
                .setFirstResult(start)
                .setMaxResults(limit).list();
        for(User item : list){
            item.setPassword("");
        }
        Long counts = (Long) createQuery(username,realName,role,session).setProjection(Projections.count("id")).uniqueResult();
        Page<User> page = new Page<User>();
        page.setRecords(list);
        page.setTotal(counts == null ? 0 : counts.intValue());
        page.setStart(start);
        return page;
    }

    private Criteria createQuery(String username,String realName, Role role, Session session) {
        Criteria criteria = session.createCriteria(User.class);
        if(StringUtils.isNotBlank(username)){
            criteria.add(Restrictions.like("name", "%" + username + "%"));
        }
        if(StringUtils.isNotBlank(realName)){
            criteria.add(Restrictions.like("realName", "%" + realName + "%"));
        }
        if(role != null){
            criteria.add(Restrictions.eq("role", role));
        }
        return criteria;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

	@Override
	public void regist(UserInfo userInfo) {
		Session session = sessionFactory.getCurrentSession();
		User user = findByName(userInfo.getName());
		if(user != null){
			throw new YPManageException(YPManageException.USER_EXISTS, "用户已存在！");
		}
		User tmp = new User();
		BeanUtils.copyProperties(userInfo, tmp);
		tmp.setPassword(encodePassword(userInfo.getName() ,userInfo.getPassWord()));
		tmp.setLastModify(new Date());
		tmp.setMaxCapacity(MAX_CAPACITY);
		tmp.setUsedCapactity((long)0);
		tmp.setPasswordRetries(PASSWORD_RETRIES);
		tmp.setRole(Role.OPERATOR);
		tmp.setState(UserState.NORMAL);
		tmp.setPasswordValidDate(new Date());
		session.save(tmp);
	}

}
