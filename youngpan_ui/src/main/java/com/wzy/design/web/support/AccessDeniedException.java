package com.wzy.design.web.support;

public class AccessDeniedException extends FTManageException{

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    public AccessDeniedException() {
        super();
    }

    public AccessDeniedException(int errorCode, String message, Throwable cause) {
        super(errorCode, message, cause);
    }

    public AccessDeniedException(int errorCode, String message) {
        super(errorCode, message);
    }

    public AccessDeniedException(int errorCode, Throwable cause) {
        super(errorCode, cause);
    }
    

}
