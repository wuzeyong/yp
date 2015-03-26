package com.wzy.design.support;

/**
 * 管理接口异常类
 * <li>功能简述:
 * <li>详细描述:
 * @author  wzy
 * @version  [1.0 Dec 15, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
public class YPManageException extends RuntimeException {

    private int errorCode;
    
    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public static final int USER_DISABLED = 1;

    public static final int USER_EXISTS = 2;

    public static final int BAD_CREDENTIAL = 3;

    public static final int USER_LOCK = 4;

    public static final int NODE_EXISTS = 5;

    public static final int ID_NOT_EXISTS = 6;

    public static final int REFERENCED = 7;

	public static final int NO_FILES = 8;

	public static final int HDFS_IO_FAILE = 9;

	public static final int FILE_UPLOAD_ERROR = 10;

	public static final int FILE_EXIT = 11;

    public YPManageException() {
        super();
    }

    public YPManageException(int errorCode,String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public YPManageException(int errorCode,String message) {
        this(errorCode,message,null);
    }

    public YPManageException(int errorCode,Throwable cause) {
        this(errorCode,null,cause);
    }

    public int getErrorCode() {
        return errorCode;
    }
    
    

}
