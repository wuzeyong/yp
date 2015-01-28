/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * linxueqin   2013-7-19   comment
 * linxueqin  2013-7-19  Created
 */
package com.wzy.design.web.support; 

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 文本到日志转换对象
 * <li>功能简述:
 * <li>详细描述:
 * @author  wzy
 * @version  [1.0 Dec 16, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
public class DatePropertyEditor extends PropertyEditorSupport {

    /**
     * 
     */
    public DatePropertyEditor() {
    }

    /**
     * @param source
     */
    public DatePropertyEditor(Object source) {
        super(source);
    }

    /* (non-Javadoc)
     * @see java.beans.PropertyEditorSupport#setAsText(java.lang.String)
     */
    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        Date result = null;
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            result = format.parse(text);
        } catch (ParseException e) {
            format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                result = format.parse(text);
            } catch (ParseException e1) {
                //TODO 
            }
        }
        setValue(result);
    }
    
    /* (non-Javadoc)
     * @see java.beans.PropertyEditorSupport#getAsText()
     */
    @Override
    public String getAsText() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return format.format(getValue());
    }
    
}
 
