package com.wzy.design.service.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import com.wzy.design.entity.FileInfo;
import com.wzy.design.entity.FilePath;
import com.wzy.design.service.FilePathService;

@Transactional(rollbackFor = Exception.class)
public class FilePathServiceImpl implements FilePathService{
	
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<FileInfo> remove(FileInfo fileInfo) {
		Session session = sessionFactory.getCurrentSession();
		List<FileInfo>  descendants = session.createCriteria(FilePath.class)
				.setProjection(Projections.property( "descendant"))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
				.add(Restrictions.eq("ancestor", fileInfo)).list();
		List<FilePath> filePaths = session.createCriteria(FilePath.class).
				add(Restrictions.in("descendant", descendants))
				.list();
		for(FilePath path:filePaths){
			session.delete(path);
		}
		return descendants;
	}


	



}
