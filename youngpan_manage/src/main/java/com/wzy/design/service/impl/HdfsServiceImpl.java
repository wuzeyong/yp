package com.wzy.design.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;

import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.mapred.JobConf;
import org.springframework.transaction.annotation.Transactional;

import com.wzy.design.service.HdfsService;
import com.wzy.design.support.YPManageException;

@Transactional(rollbackFor = Exception.class)
public class HdfsServiceImpl implements HdfsService {
	
	private static final int BUFFER_SIZE = 2048;
	
	private String hdfsPath;

	public void setHdfsPath(String hdfsPath) {
		this.hdfsPath = hdfsPath;
	}
	
	 //加载Hadoop配置文件
    public  static JobConf config(){
        JobConf conf = new JobConf(HdfsServiceImpl.class);
        conf.setJobName("HdfsServiceImpl");
        return conf;
    }
	
    
	 //创建文件夹
    public void mkdirs(String folder)  {
        Path path = new Path(folder);
        FileSystem fs;
		try {
			fs = FileSystem.get(URI.create(hdfsPath), config());
			if (!fs.exists(path)) {
	            fs.mkdirs(path);
	            System.out.println("Create: " + folder);
	        }
	        fs.close();
		}catch (IOException e) {
			throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
		}
        
    }
    
    //某个文件夹的文件列表
    public FileStatus[] ls(String folder)  {
    	try {
    		Path path = new Path(folder);
            FileSystem fs = FileSystem.get(URI.create(hdfsPath), config());
            FileStatus[] list = fs.listStatus(path);
            System.out.println("ls: " + folder);
            System.out.println("==========================================================");
            if(list != null)
            for (FileStatus f : list) {
                //System.out.printf("name: %s, folder: %s, size: %d\n", f.getPath(), f.isDir(), f.getLen());
            	System.out.printf("%s, folder: %s, 大小: %dK\n", f.getPath().getName(), (f.isDir()?"目录":"文件"), f.getLen()/1024);
            }
            System.out.println("==========================================================");
            fs.close();
            
            return  list;
		} catch (IOException e) {
			throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
		}
        
    }
    
    
    public void upload(InputStream in, String path) {
    	FileSystem fs = null;
    	FSDataOutputStream fsOut = null;
		try {
			fs = FileSystem.get(URI.create(hdfsPath), config());
			fsOut  = fs.create(new Path(path));
	        byte buffer[] = new byte[BUFFER_SIZE];
	        int byteRead = 0;
	        while((byteRead=in.read(buffer))>0){
	        	fsOut.write(buffer, 0, byteRead);
	        }
		} catch (IOException e) {
			throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
		}finally{
			 try {
				fsOut.close();
				in.close();
			    fs.close();
			} catch (IOException e) {
				throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
			}
		}
        
    }
    
    //删除文件或文件夹
    public void rmr(String folder) {
    	try {
    		Path path = new Path(folder);
            FileSystem fs = FileSystem.get(URI.create(hdfsPath), config());
            fs.deleteOnExit(path);
            System.out.println("Delete: " + folder);
            fs.close();
		} catch (IOException e) {
			throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
		}
    }
    
    
    //下载文件到本地系统
    public InputStream download(String path){
    	FileSystem fs = null;
    	 FSDataInputStream fsIn = null;
    	 FSDataOutputStream out = null;
    	try {
            fs = FileSystem.get(URI.create(hdfsPath), config());
            fsIn =  fs.open(new Path(path));
            IOUtils.copyBytes(fsIn, out, config());
            out.getWrappedStream();
            //fs.copyToLocalFile(new Path(path), new Path("/home/wuzeyong/svn命令"));
            return fsIn;
		} catch (IOException e) {
			throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
		}finally{
			try {
				fsIn.close();
				fs.close();
			} catch (IOException e) {
				throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
			}
		}
        
    }

	@Override
	public void rename(String fileName, String newPath,String oldPath) {
		try {
			FileSystem fs =  FileSystem.get(URI.create(hdfsPath), config());
			fs.rename(new Path(oldPath), new Path(newPath));
		} catch (IOException e) {
			throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
		}
	}

	@Override
	public void move(String srcPath, String desPath) {
		try {
			FileSystem fs =  FileSystem.get(URI.create(hdfsPath), config());
			fs.rename(new Path(srcPath), new Path(desPath));
		} catch (IOException e) {
			throw new YPManageException(YPManageException.HDFS_IO_FAILE,"后台文件系统出错，请联系管理员!");
		}
	}
}
