package com.wzy.design.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import com.wzy.design.entity.FileInfo;
import com.wzy.design.entity.FilePath;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.service.FilePathService;
import com.wzy.design.support.CriteriaCreator;
import com.wzy.design.support.Page;
import com.wzy.design.support.YPManageException;
import com.wzy.design.util.QueryUtil;


@Transactional(rollbackFor = Exception.class)
public class FileInfoServiceImpl implements FileInfoService {
	
	private SessionFactory sessionFactory;
	
	private FilePathService filePathService;
	
	public void setSessionFactory(SessionFactory sessionFactory){
		this.sessionFactory = sessionFactory;
	}

	public void setFilePathService(FilePathService filePathService) {
		this.filePathService = filePathService;
	}

	private Criteria createQuery(String userName,boolean count,Session session) {
		Criteria criteria = session.createCriteria(FileInfo.class);
        if(StringUtils.isNotBlank(userName)){
            criteria.add(Restrictions.eq("userName", userName));
        }
        criteria.add(Restrictions.eq("origin", true));
        if(count){
        	criteria.setProjection(Projections.count("id"));
        }else{
        	criteria.addOrder(Order.desc("id"));
        }
        return criteria;
    }
	
	@Override
    @Transactional(readOnly=true)
	public Page<FileInfo> query(final String userName, int start,int limit) {
        final Session session = sessionFactory.getCurrentSession();
        Page<FileInfo> page = QueryUtil.createPageByCriteria(new CriteriaCreator() {
			@Override
			public Criteria create(boolean count) {
				return createQuery(userName,count,session);
			}
		}, start, limit);
        return page;
	}
	
	@Override
	@Transactional(readOnly=true)
	public FileInfo get(int id) {
		return (FileInfo) sessionFactory.getCurrentSession().get(FileInfo.class, id);
	}

	@Override
	public void updateFileName(int id, String fileName) {
		Session session = sessionFactory.getCurrentSession();
		FileInfo  info = (FileInfo) session.get(FileInfo.class, id);
		if(info == null){
			throw new YPManageException(YPManageException.ID_NOT_EXISTS, "文件不存在！");
		}
		info.setFileName(fileName);
		session.saveOrUpdate(info);
	}

	@Override
	public List<FileInfo> remove(int[] ids) {
		List<FileInfo> removedFileInfos = new ArrayList<FileInfo>();
		if(ids == null){
			return null;
		}
		for(int i = 0; i < ids.length ;i++){
			removedFileInfos.add(remove(ids[i]));
		}
		return removedFileInfos;
	}

	private FileInfo remove(int i) {
		Session session = sessionFactory.getCurrentSession();
		FileInfo removedFileInfo = get(i);
		if(removedFileInfo == null){
			return null;
		}
		session.delete(removedFileInfo);
		filePathService.remove(removedFileInfo);
		return removedFileInfo;
	}

	@Override
	public Long queryByUserName(String currentUserName) {
		Session session = sessionFactory.getCurrentSession();
		Long count = (Long) createQuery(currentUserName,true,session).uniqueResult();
		return count;
	}

	@Override
	public void uploadAll(HashMap<String, FileInfo> filesInSession) {
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<FileInfo> queryAncestorByDescendant(Integer id) {
		final Session session = sessionFactory.getCurrentSession();
		final FileInfo descendant = get(id);
		List<FileInfo> ancestors =session.createCriteria(FilePath.class)
				.setProjection(Projections.property( "ancestor"))
				.add(Restrictions.eq("descendant", descendant))
				.addOrder(Order.desc("id"))
				.list();
		ancestors.remove(descendant);
		return ancestors;
	}

	@Override
	public Page<FileInfo> query(Integer id, int start, int limit) {
		
		final Session session = sessionFactory.getCurrentSession();
		final FileInfo ancestor = get(id);
		 Page<FileInfo> page = QueryUtil.createPageByCriteria(new CriteriaCreator() {
				@Override
				public Criteria create(boolean count) {
					return createQuery(ancestor,count,session);
				}
			}, start, limit);
	       return page;
	}

	protected Criteria createQuery(FileInfo ancestor, boolean count,
			Session session) {
		Criteria criteria = session.createCriteria(FilePath.class)
				.setProjection(Projections.groupProperty( "descendant"));
        if(ancestor != null){
            criteria.add(Restrictions.eq("ancestor", ancestor));
            criteria.add(Restrictions.ne("descendant", ancestor));
        }
        if(count){
        	criteria.setProjection(Projections.count("id"));
        }else{
        	criteria.addOrder(Order.desc("id"));
        }
        return criteria;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<FileInfo> queryDescendantByAncestor(Integer id) {
		final Session session = sessionFactory.getCurrentSession();
		final FileInfo ancestor = get(id);
		List<FileInfo> descendants =session.createCriteria(FilePath.class)
				.setProjection(Projections.property("descendant"))
				.add(Restrictions.eq("ancestor", ancestor))
				.addOrder(Order.desc("id"))
				.list();
		descendants.remove(ancestor);
		return descendants;
	}

}
