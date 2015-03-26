package com.wzy.design.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.wzy.design.base.FileType;
import com.wzy.design.domain.Document;
import com.wzy.design.domain.Music;
import com.wzy.design.domain.Picture;
import com.wzy.design.domain.TreeNode;
import com.wzy.design.domain.Video;
import com.wzy.design.entity.FileInfo;
import com.wzy.design.entity.FilePath;
import com.wzy.design.entity.User;
import com.wzy.design.service.FileInfoService;
import com.wzy.design.service.FilePathService;
import com.wzy.design.service.HdfsService;
import com.wzy.design.support.CriteriaCreator;
import com.wzy.design.support.Page;
import com.wzy.design.support.YPManageException;
import com.wzy.design.util.DateUtil;
import com.wzy.design.util.QueryUtil;


@Transactional(rollbackFor = Exception.class)
public class FileInfoServiceImpl implements FileInfoService {
	
	private static final long DIRECTORY_SIZE = 4096;
	
	private SessionFactory sessionFactory;
	
	private FilePathService filePathService;
	
	private HdfsService hdfsService;
	
	
	public void setSessionFactory(SessionFactory sessionFactory){
		this.sessionFactory = sessionFactory;
	}

	public void setFilePathService(FilePathService filePathService) {
		this.filePathService = filePathService;
	}

	public void setHdfsService(HdfsService hdfsService) {
		this.hdfsService = hdfsService;
	}

	private Criteria createQuery(String userName,boolean count,Session session) {
		Criteria criteria = session.createCriteria(FileInfo.class);
        if(StringUtils.isNotBlank(userName)){
            criteria.add(Restrictions.eq("userName", userName));
        }
        criteria.add(Restrictions.eq("origin", true));
        criteria.add(Restrictions.eq("trash", false));
        if(count){
        	criteria.setProjection(Projections.count("id"));
        }else{
        	criteria.addOrder(Order.asc("id"));
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
	@SuppressWarnings("unchecked")
	private FileInfo remove(int i) {
		Session session = sessionFactory.getCurrentSession();
		FileInfo fileRemoved = get(i);
		fileRemoved.setTopTrash(true);
		List<FileInfo> descendantsRemoved = session.createCriteria(FilePath.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
				.setProjection(Projections.property("descendant"))
				.add(Restrictions.eq("ancestor", fileRemoved))
				.list();
		for(FileInfo descendant:descendantsRemoved){
			descendant.setTrash(true);
		}
		return fileRemoved;
	}

	@Override
	@Transactional(readOnly=true)
	public Long queryByUserName(String currentUserName) {
		Session session = sessionFactory.getCurrentSession();
		Long count = (Long) createQuery(currentUserName,true,session).uniqueResult();
		return count;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void upload(MultipartFile multipartFile, Integer id, User user){
		Session session = sessionFactory.getCurrentSession();
		String fileInSidePath = getFilePath(id, user.getName());
		long fileSize = 0; 
		try {
			String path = fileInSidePath + "/"+multipartFile.getOriginalFilename();
			FileInfo  file = new FileInfo();
			List<String> contentTypes = getAllContentTypes();
			if(contentTypes.contains(multipartFile.getContentType())){
				file.setContentType(multipartFile.getContentType().replace("/", "-"));
			}else{
				file.setContentType("notype");
			}
			file.setDirectory(false);
			file.setFileName(multipartFile.getOriginalFilename());
			file.setFileSize(multipartFile.getSize());
			file.setLastModify(new Date());
			if(id == null){
				file.setOrigin(true);
				List<FileInfo> orignFiles = session.createCriteria(FileInfo.class)
						.add(Restrictions.eq("userName", user.getName()))
						.add(Restrictions.eq("origin", true))
						.add(Restrictions.eq("directory", false))
						.list();
				for(FileInfo orignFile:orignFiles){
					if(orignFile.getFileName().equals(multipartFile.getOriginalFilename()))
						throw new YPManageException(YPManageException.FILE_EXIT,"文件已经存在");
				}
			}
			file.setUserName(user.getName());
			file.setPathInside(path);
			session.save(file);
			List<FileInfo> ancestors = null;
			if(id != null){
				ancestors = queryAncestorByDescendant(id);
				List<FileInfo> descendants = queryDescendantsByAncestor(id);
				for(FileInfo descendant:descendants){
					if(descendant.getFileName().equals(multipartFile.getOriginalFilename()) && !descendant.isDirectory())
						throw new YPManageException(YPManageException.FILE_EXIT,"文件已经存在");
				}
				FileInfo parentFile = get(id);
				FilePath filePath = new FilePath();
				filePath.setAncestor(parentFile);
				filePath.setDescendant(file);
				filePath.setFatherAndSon(true);
				filePath.setLastModify(new Date());
				session.save(filePath);
			}else{
				ancestors = new ArrayList<FileInfo>();
			}
			ancestors.add(file);
			for(FileInfo ancestor:ancestors){
				FilePath tmp = new FilePath();
				tmp.setAncestor(ancestor);
				tmp.setDescendant(file);
				tmp.setFatherAndSon(false);
				tmp.setLastModify(new Date());
				session.save(tmp);
			}
			hdfsService.upload(multipartFile.getInputStream(), path);
			fileSize += file.getFileSize();
		} catch (IOException e) {
			throw new YPManageException(YPManageException.FILE_UPLOAD_ERROR,"上传内容有误，请检查！");
		}
		user.setLastModify(new Date());
		user.setUsedCapactity(user.getUsedCapactity()+fileSize);
		session.saveOrUpdate(user);
	}

	private List<String> getAllContentTypes() {
		List<String> contentTypes = new ArrayList<String>();
		for(Document document:Document.values()){
			contentTypes.add(document.getLabel());
		}
		for(Music music:Music.values()){
			contentTypes.add(music.getLabel());
		}
		for(Picture picture:Picture.values()){
			contentTypes.add(picture.getLabel());
		}
		for(Video video:Video.values()){
			contentTypes.add(video.getLabel());
		}
		return contentTypes;
	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly=true)
	public List<FileInfo> queryAncestorByDescendant(Integer id) {
		final Session session = sessionFactory.getCurrentSession();
		final FileInfo descendant = get(id);
		List<FileInfo> ancestors =session.createCriteria(FilePath.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
				.setProjection(Projections.property( "ancestor"))
				.add(Restrictions.eq("descendant", descendant))
				.addOrder(Order.desc("id"))
				.list();
		ancestors.remove(descendant);
		return ancestors;
	}

	@Override
	@Transactional(readOnly=true)
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
            criteria.add(Restrictions.eq("fatherAndSon", true));
        }
        criteria.createAlias("descendant", "d").add(Restrictions.eq( "d.trash" ,  false));
        if(count){
        	criteria.setProjection(Projections.count("id"));
        }else{
        	criteria.addOrder(Order.asc("id"));
        }
        return criteria;
	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly=true)
	public List<FileInfo> queryDescendantsByAncestor(Integer id) {
		final Session session = sessionFactory.getCurrentSession();
		final FileInfo ancestor = get(id);
		List<FileInfo> descendants =session.createCriteria(FilePath.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
				.setProjection(Projections.property("descendant"))
				.add(Restrictions.eq("ancestor", ancestor))
				.add(Restrictions.eq("fatherAndSon", true))
				.addOrder(Order.asc("id"))
				.list();
		descendants.remove(ancestor);
		return descendants;
	}

	@Override
	public void createDir(Integer id, String fileName, String lastModify,String userName) {
		Session session = sessionFactory.getCurrentSession();
		FileInfo fileInfo = new FileInfo();
		fileInfo.setFileName(fileName);
		fileInfo.setLastModify(DateUtil.string2Date(lastModify));
		fileInfo.setContentType("dir");
		fileInfo.setDirectory(true);
		fileInfo.setFileSize(DIRECTORY_SIZE);
		List<FileInfo> ancestors = null;
		FilePath path = null;
		if(id != null){
			ancestors = queryAncestorByDescendant(id);
			FileInfo parentFile = get(id);
			path = new FilePath();
			path.setAncestor(parentFile);
			path.setDescendant(fileInfo);
			path.setFatherAndSon(true);
		}else{
			fileInfo.setOrigin(true);
			ancestors = new ArrayList<FileInfo>();
		}
		String filePath = getFilePath(id, userName)+"/"+fileName;
		fileInfo.setUserName(userName);
		hdfsService.mkdirs(filePath);
		fileInfo.setPathInside(filePath);
		session.save(fileInfo);
		if(id != null){
			session.save(path);
		}
		ancestors.add(fileInfo);
		for(FileInfo ancestor:ancestors){
			FilePath tmp = new FilePath();
			tmp.setAncestor(ancestor);
			tmp.setDescendant(fileInfo);
			tmp.setFatherAndSon(false);
			session.save(tmp);
		}
	}
	
	protected String getFilePath(Integer id,String userName){
		StringBuffer sb = new StringBuffer();
		sb.append("/").append(userName);
		if(id != null){
			List<FileInfo> ancestors = queryAncestorByDescendant(id);
			for(FileInfo ancestor:ancestors){
				sb.append("/").append(ancestor.getFileName());
			}
			sb.append("/").append(get(id).getFileName());
		}
		return sb.toString();
	}

	@Override
	@Transactional(readOnly=true)
	public Long queryAllPictures(String userName) {
		Session session = sessionFactory.getCurrentSession();
		List<String> pictureTypes = new ArrayList<String>();
		for(Picture picture:Picture.values()){
			pictureTypes.add(picture.getLabel());
		}
		Long pictures = (Long)session.createCriteria(FileInfo.class)
				.add(Restrictions.eq("userName", userName))
				.add(Restrictions.eq("trash", false))
				.add(Restrictions.in("contentType",pictureTypes))
				.setProjection(Projections.count("id"))
				.uniqueResult();
		return pictures;
	}


	@Override
	@Transactional(readOnly=true)
	public Long queryAllMusic(String userName) {
		Session session = sessionFactory.getCurrentSession();
		List<String> musicTypes = new ArrayList<String>();
		for(Music music:Music.values()){
			musicTypes.add(music.getLabel());
		}
		Long musics = (Long)session.createCriteria(FileInfo.class)
				.add(Restrictions.eq("userName", userName))
				.add(Restrictions.eq("trash", false))
				.add(Restrictions.in("contentType",musicTypes))
				.setProjection(Projections.count("id"))
				.uniqueResult();
		return musics;
	}

	@Override
	@Transactional(readOnly=true)
	public Long queryAllVideo(String userName) {
		Session session = sessionFactory.getCurrentSession();
		List<String> videoTypes = new ArrayList<String>();
		for(Video video:Video.values()){
			videoTypes.add(video.getLabel());
		}
	Long videos = (Long)session.createCriteria(FileInfo.class)
				.add(Restrictions.eq("userName", userName))
				.add(Restrictions.eq("trash", false))
				.add(Restrictions.in("contentType",videoTypes))
				.setProjection(Projections.count("id"))
				.uniqueResult();
		return videos;
	}

	@Override
	@Transactional(readOnly=true)
	public Long queryAllDocument(String userName) {
		Session session = sessionFactory.getCurrentSession();
		List<String> documentTypes = new ArrayList<String>();
		for(Document document:Document.values()){
			documentTypes.add(document.getLabel());
		}
		Long documents = (Long)session.createCriteria(FileInfo.class)
				.add(Restrictions.eq("userName", userName))
				.add(Restrictions.eq("trash", false))
				.add(Restrictions.in("contentType",documentTypes))
				.setProjection(Projections.count("id"))
				.uniqueResult();
		return documents;
	}

	@Override
	@Transactional(readOnly=true)
	public Long queryAllOther(String userName) {
		Session session = sessionFactory.getCurrentSession();
		List<String> contentTypes = new ArrayList<String>();
		for(Document document:Document.values()){
			contentTypes.add(document.getLabel());
		}
		for(Video video:Video.values()){
			contentTypes.add(video.getLabel());
		}
		for(Music music:Music.values()){
			contentTypes.add(music.getLabel());
		}
		for(Picture picture:Picture.values()){
			contentTypes.add(picture.getLabel());
		}
		Long num = (Long) session.createCriteria(FileInfo.class)
				.add(Restrictions.eq("userName", userName))
				.add(Restrictions.eq("directory", false))
				.add(Restrictions.eq("trash", false))
				.add(Restrictions.not(Restrictions.in("contentType", contentTypes)))
				.setProjection(Projections.count("id"))
				.uniqueResult();
		return num;
	}
	
	@Override
	@Transactional(readOnly=true)
	public Page<FileInfo> queryFileByContentType(final String userName,final List<String> contentTypes,
			int start, int limit) {
		final Session session = sessionFactory.getCurrentSession();
        Page<FileInfo> page = QueryUtil.createPageByCriteria(new CriteriaCreator() {
			@Override
			public Criteria create(boolean count) {
				return createQuery(userName,contentTypes,count,session);
			}
		}, start, limit);
        return page;
	}

	protected Criteria createQuery(String userName,List<String> contentTypes, boolean count,
			Session session) {
		Criteria criteria = session.createCriteria(FileInfo.class);
		if(StringUtils.isNotBlank(userName)){
            criteria.add(Restrictions.eq("userName", userName));
        }
        if(contentTypes.size() > 0){
            criteria.add(Restrictions.in("contentType", contentTypes));
        }
        criteria.add(Restrictions.eq("trash", false));
        if(count){
        	criteria.setProjection(Projections.count("id"));
        }else{
        	criteria.addOrder(Order.asc("id"));
        }
        return criteria;
	}

	@Override
	@Transactional(readOnly=true)
	public Page<FileInfo> queryOtherByContentType(final String userName,int start, int limit) {
		final Session session = sessionFactory.getCurrentSession();
        Page<FileInfo> page = QueryUtil.createPageByCriteria(new CriteriaCreator() {
			@Override
			public Criteria create(boolean count) {
				return createQueryOther(userName,count,session);
			}
		}, start, limit);
        return page;
	}

	protected Criteria createQueryOther(String userName,boolean count, Session session) {
		List<String> contentTypes = new ArrayList<String>();
		for(Document document:Document.values()){
			contentTypes.add(document.getLabel());
		}
		for(Video video:Video.values()){
			contentTypes.add(video.getLabel());
		}
		for(Music music:Music.values()){
			contentTypes.add(music.getLabel());
		}
		for(Picture picture:Picture.values()){
			contentTypes.add(picture.getLabel());
		}
		Criteria criteria = session.createCriteria(FileInfo.class);
		if(StringUtils.isNotBlank(userName)){
            criteria.add(Restrictions.eq("userName", userName));
        }
        if(contentTypes.size() > 0){
            criteria.add(Restrictions.not(Restrictions.in("contentType", contentTypes)));
        }
        criteria.add(Restrictions.eq("trash", false));
        criteria.add(Restrictions.eq("directory", false));
        if(count){
        	criteria.setProjection(Projections.count("id"));
        }else{
        	criteria.addOrder(Order.asc("id"));
        }
        return criteria;
	}

	@Override
	@Transactional(readOnly=true)
	public Long queryAllTrash(String userName) {
		Session session = sessionFactory.getCurrentSession();
		Long trashNum = (Long)session.createCriteria(FileInfo.class)
				.add(Restrictions.eq("userName", userName))
				.add(Restrictions.eq("trash", true))
				.setProjection(Projections.count("id"))
				.uniqueResult();
		return trashNum;
	}

	@Override
	@Transactional(readOnly=true)
	public Page<FileInfo> queryTrash(final String userName, int start,
			int limit) {
		final Session session = sessionFactory.getCurrentSession();
        Page<FileInfo> page = QueryUtil.createPageByCriteria(new CriteriaCreator() {
			@Override
			public Criteria create(boolean count) {
				return createQueryTrash(userName,count,session);
			}
		}, start, limit);
        return page;
	}

	protected Criteria createQueryTrash(String userName, boolean count,
			Session session) {
		Criteria criteria = session.createCriteria(FileInfo.class);
		if(StringUtils.isNotBlank(userName)){
            criteria.add(Restrictions.eq("userName", userName));
        }
		criteria.add(Restrictions.eq("trash", true));
		criteria.add(Restrictions.eq("topTrash", true));
		if(count){
        	criteria.setProjection(Projections.count("id"));
        }else{
        	criteria.addOrder(Order.asc("id"));
        }
		return criteria;
	}

	@Override
	@Transactional(readOnly=true)
	public Page<FileInfo> queryTrash(Integer id, String currentUserName,
			int start, int limit) {
		final Session session = sessionFactory.getCurrentSession();
		final FileInfo ancestor = get(id);
		 Page<FileInfo> page = QueryUtil.createPageByCriteria(new CriteriaCreator() {
				@Override
				public Criteria create(boolean count) {
					return createQueryTrashByAncestor(ancestor,count,session);
				}
			}, start, limit);
	       return page;
	}

	protected Criteria createQueryTrashByAncestor(FileInfo ancestor,
			boolean count, Session session) {
		Criteria criteria = session.createCriteria(FilePath.class)
				.setProjection(Projections.groupProperty( "descendant"));
        if(ancestor != null){
            criteria.add(Restrictions.eq("ancestor", ancestor));
            criteria.add(Restrictions.eq("fatherAndSon", true));
        }
        if(count){
        	criteria.setProjection(Projections.count("id"));
        }else{
        	criteria.addOrder(Order.asc("id"));
        }
        return criteria;
	}

	@Override
	public FileInfo removeForever(Integer id,User user) {
		Session session = sessionFactory.getCurrentSession();
		FileInfo fileRemoved = get(id);
		if(fileRemoved == null){
			return null;
		}
		String filePath = fileRemoved.getPathInside();
		List<FileInfo> files = filePathService.remove(fileRemoved);
		for(FileInfo file:files){
			session.delete(file);
		}
		hdfsService.rmr(filePath);
		user.setUsedCapactity(user.getUsedCapactity()-fileRemoved.getFileSize());
		session.saveOrUpdate(user);
		return fileRemoved;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void undo(Integer id) {
		Session session = sessionFactory.getCurrentSession();
		FileInfo fileRemoved = get(id);
		fileRemoved.setTopTrash(false);
		List<FileInfo> descendantsRemoved = session.createCriteria(FilePath.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
				.setProjection(Projections.property("descendant"))
				.add(Restrictions.eq("ancestor", fileRemoved))
				.list();
		for(FileInfo descendant:descendantsRemoved){
			descendant.setTrash(false);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<TreeNode> getNodes(String userName,Integer id) {
		Session session = sessionFactory.getCurrentSession();
		List<FileInfo> fileInfos = null;
		if(id == null){
			fileInfos = session.createCriteria(FileInfo.class)
					.add(Restrictions.eq("userName", userName))
					.add(Restrictions.eq("origin", true))
					.list();
		}else{
			fileInfos = session.createCriteria(FilePath.class)
					.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
					.setProjection(Projections.property("descendant"))
					.add(Restrictions.eq("ancestor", get(id)))
					.add(Restrictions.eq("fatherAndSon", true))
					.list();
		}
		List<TreeNode> nodes = new ArrayList<TreeNode>();
		for(FileInfo file:fileInfos){
			if(!file.isDirectory()) continue;
			TreeNode node = new TreeNode();
			node.setId(file.getId());
			node.setText(file.getFileName());
			nodes.add(node);
		}
		return nodes;
	}

}
