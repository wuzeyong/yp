package com.wzy.design.base;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 抽象实体，所有实体类都继承于该类，
 * <li>功能简述:
 * <li>详细描述:
 * @author  wzy
 * @version  [1.0 Dec 15, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */

public class AbstractEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    /**
     * 唯一标识
     */
    protected int id;
    /**
     * 最后修改时间
     */
    private Date lastModify = new Date();

    /**
     * @return the id
     */
    public int getId() {
        return this.id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }
    
    public Date getLastModify() {
        return lastModify;
    }

    public void setLastModify(Date lastModify) {
        this.lastModify = lastModify;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * getClass().getName().hashCode() + id;
        return result;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!this.getClass().isAssignableFrom(obj.getClass())) {
            return false;
        }
        AbstractEntity entity = (AbstractEntity) obj;
        return this.id == 0 ? false : this.id == entity.id;
    }

    /**
     * @param list
     * @return
     */
    public static List<Integer> getIds(List<AbstractEntity> list) {
        List<Integer> ids = new ArrayList<Integer>();
        for (AbstractEntity item : list) {
            ids.add(item.getId());
        }
        return ids;
    }

    @Override
    public String toString() {
        return "AbstractEntity [id=" + id + ", lastModify=" + lastModify + "]";
    }
 
    
    
}