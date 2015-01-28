package com.wzy.design.support;

import java.util.ArrayList;
import java.util.List;
/**
 * 分页对象
 * <li>功能简述:
 * <li>详细描述:
 * @param <T>
 * @author  wzy
 * @version  [1.0 Dec 15, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
public class  Page<T> {
    
    private static final int DEFAULT_LIMIT = 10;
    
    public static final int MAX_LIMIT = 100000;

    private int total;
    
    private int start;
    
    private int limit = DEFAULT_LIMIT;
    
    private List<T> records = new ArrayList<T>();

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<T> getRecords() {
        return records;
    }

    public void setRecords(List<T> records) {
        this.records = records;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
    
}
